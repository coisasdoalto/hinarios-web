import { ActionIcon, Tooltip } from '@mantine/core';
import { IconHeart } from '@tabler/icons';
import { IconHeartFilled } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import { useDebounceCallback } from 'usehooks-ts';

import { useFavorites } from '../../hooks/useFavorites';
import { queryClient } from '../../pages/_app';
import { favoritesService } from '../../services/favorites';

type FavoriteButtonProps = {
  hymnSlug: string;
};

export function FavoriteButton({ hymnSlug }: FavoriteButtonProps) {
  const isFavoritesEnabled = useFeatureFlagEnabled('favorites');

  const { data, isLoading } = useFavorites();

  const { data: session } = useSession();

  const { mutateAsync: addFavorite } = useMutation({
    mutationFn: () => favoritesService.add(hymnSlug),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      }),
  });

  const { mutateAsync: removeFavorite } = useMutation({
    mutationFn: () => favoritesService.remove(hymnSlug),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      }),
  });

  const handleAddFavorite = useDebounceCallback(addFavorite, 500);
  const handleRemoveFavorite = useDebounceCallback(removeFavorite, 500);

  if (!isFavoritesEnabled || isLoading || !session) {
    return null;
  }

  const isFavorite = data?.favorites.includes(hymnSlug);

  const handleClick = () => (isFavorite ? handleRemoveFavorite() : handleAddFavorite());

  return (
    <Tooltip label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
      <ActionIcon variant="subtle" onClick={handleClick}>
        {isFavorite ? <IconHeartFilled /> : <IconHeart />}
      </ActionIcon>
    </Tooltip>
  );
}

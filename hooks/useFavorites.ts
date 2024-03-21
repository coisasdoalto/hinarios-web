import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import { favoritesService } from '../services/favorites';

export function useFavorites() {
  const { data: session } = useSession();
  const isFavoritesEnabled = useFeatureFlagEnabled('favorites');

  return useQuery<{ favorites: string[] }>({
    queryKey: ['favorites'],
    queryFn: () => {
      return favoritesService.list();
    },
    enabled: Boolean(session) && isFavoritesEnabled,
    placeholderData: { favorites: [] },
  });
}

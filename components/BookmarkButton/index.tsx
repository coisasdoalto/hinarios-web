import { ActionIcon, Tooltip } from '@mantine/core';
import { IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useFeatureFlagEnabled } from 'posthog-js/react';

import { useAddBookmark } from '../../hooks/bookmarks/add';
import { useGetBookmarks } from '../../hooks/bookmarks/get';
import { useRemoveBookmark } from '../../hooks/bookmarks/remove';
import { useUser } from '../../hooks/useUser';
import { HymnBookSlug } from '../../types/HymnBooks';

export function BookmarkButton() {
  const router = useRouter();

  const hymnSlug = String(router.query.slug);
  const hymnBook = String(router.query.hymnBook) as HymnBookSlug;
  const hymnId = hymnSlug.split('-')[0];

  const isBookmarksEnabled = useFeatureFlagEnabled('bookmarks');

  const { data: bookmarks, isLoading } = useGetBookmarks();

  const user = useUser();

  const { mutateAsync: addBookmark } = useAddBookmark();
  const { mutateAsync: removeBookmark } = useRemoveBookmark();

  const isBookmarked = bookmarks?.some((bookmark) => bookmark.slug === hymnSlug);

  const handleClick = async () => {
    const bookmark = {
      id: Number(hymnId),
      slug: hymnSlug,
      hymnBook,
    };

    if (isBookmarked) {
      await removeBookmark(bookmark);
      return;
    }

    await addBookmark(bookmark);
  };

  if (!isBookmarksEnabled || isLoading || !user) {
    return null;
  }

  const tooltipLabel = isBookmarked ? 'Remover dos favoritos' : 'Adicionar aos favoritos';

  return (
    <Tooltip label={tooltipLabel}>
      <ActionIcon variant="subtle" onClick={handleClick} size="lg">
        {isBookmarked ? <IconBookmarkFilled stroke={1.5} /> : <IconBookmark stroke={1.5} />}
      </ActionIcon>
    </Tooltip>
  );
}
import { NavLink, Text } from '@mantine/core';
import Link from 'next/link';

import { useHymn } from '../../hooks/useHymn';
import { Bookmark } from '../../types/database/Bookmark';
import { BookmarkListItemSkeleton } from './Skeleton';

export function BookmarkListItem({ bookmark }: { bookmark: Bookmark }) {
  const { isLoading, data: hymn } = useHymn({
    hymnNumber: bookmark.number,
    hymnBook: bookmark.hymnBook,
  });

  if (isLoading) return <BookmarkListItemSkeleton />;
  if (!hymn) return null;

  return (
    <NavLink
      key={bookmark.number}
      label={hymn.title}
      description={hymn.hymnBook.name}
      icon={<Text size="sm">{bookmark.number}</Text>}
      component={Link}
      href={`${bookmark.hymnBook}/${bookmark.slug}`}
    />
  );
}

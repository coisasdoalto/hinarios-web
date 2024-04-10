import { NavLink, Text } from '@mantine/core';
import Link from 'next/link';

import { useHymn } from '../../hooks/useHymn';
import { useHymnBook } from '../../hooks/useHymnBook';
import { Bookmark } from '../../types/Bookmark';

export function BookmarkListItem({ bookmark }: { bookmark: Bookmark }) {
  const hymnBook = useHymnBook(bookmark.hymnBook);

  const hymn = useHymn({
    hymnNumber: bookmark.id,
    hymnBook: bookmark.hymnBook,
  });

  return (
    <NavLink
      key={hymn?.number}
      label={hymn?.title}
      description={hymnBook.name}
      icon={<Text size="sm">{bookmark.id}</Text>}
      component={Link}
      href={`${bookmark.hymnBook}/${bookmark.slug}`}
    />
  );
}

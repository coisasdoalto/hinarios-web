import { Container, Group, Loader, Space, Text, Title } from '@mantine/core';
import { useGetBookmarks } from '../hooks/bookmarks/get';

import BackButton from '../components/BackButton/BackButton';
import { BookmarkListItem } from '../components/BookmarkListItem';

export default function Bookmarks() {
  const query = useGetBookmarks();

  const { data, isLoading } = query;

  const bookmarks = data ?? [];

  const hasBookmarks = bookmarks.length > 0;

  return (
    <Container size="xs">
      <BackButton to="/" />

      <Space h="md" />

      <Group>
        <Title order={1} size="h2">
          Favoritos
        </Title>
      </Group>

      <Space h="lg" />

      {bookmarks.map((bookmark) => (
        <BookmarkListItem key={bookmark.id} bookmark={bookmark} />
      ))}

      {!isLoading && !hasBookmarks && <Text>Você ainda não tem hinos favoritos</Text>}

      {isLoading && <Loader />}
    </Container>
  );
}

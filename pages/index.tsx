import { Card, Group, Text } from '@mantine/core';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import getHymnBooks from '../data/getHymnBooks';
import { HymnBook } from '../schemas/hymnBook';

type PageProps = { hymnBooks: HymnBook[] };

export default function Home({ hymnBooks }: PageProps) {
  useEffect(() => {
    localStorage.setItem('hymnBooks', JSON.stringify(hymnBooks));
  }, []);

  return (
    <Group>
      {hymnBooks.map((hymnBook) => (
        <Card key={hymnBook.slug} shadow="sm" p="xl" component={Link} href={`/${hymnBook.slug}`}>
          <Text weight={500} size="lg" m={0}>
            {hymnBook.name}
          </Text>
        </Card>
      ))}
    </Group>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const hymnBooks = await getHymnBooks();

  return { props: { hymnBooks } };
};

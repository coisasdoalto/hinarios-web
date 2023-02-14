import { Card, Group, Text } from '@mantine/core';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import getHymnBookInfo from '../data/getHymnBookInfo';
import getHymnBooks from '../data/getHymnBooks';
import { storage } from '../firebase';
import { HymnBook } from '../schemas/hymnBook';
import { hymnBookInfoSchema } from '../schemas/hymnBookInfo';

type PageProps = { hymnBooks: HymnBook[] };

export default function Home({ hymnBooks }: PageProps) {
  return (
    <Group mt={16}>
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

import { GetStaticPaths, GetStaticProps } from 'next';
import { z } from 'zod';
import HymnsList from '../../components/HymnsList/HymnsList';
import getHymnBookInfo from '../../data/getHymnBookInfo';
import getHymnBooks from '../../data/getHymnBooks';
import { storage } from '../../firebase';
import { useHymnBooksSave } from '../../hooks/useHymnBooks';
import { HymnBook } from '../../schemas/hymnBook';
import { HymnsIndex, hymnsIndexSchema } from '../../schemas/hymnsIndex';

type PageProps = {
  hymnsIndex: HymnsIndex;
  hymnBook: HymnBook;
  hymnBooks: HymnBook[];
};

export default function Home({ hymnsIndex, hymnBook, hymnBooks }: PageProps) {
  useHymnBooksSave(hymnBooks);

  return <HymnsList hymnsIndex={hymnsIndex} hymnBook={hymnBook} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const hymnBooks = await getHymnBooks();

  const paths = hymnBooks.map((hymnBook) => ({
    params: { hymnBook: hymnBook.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const hymnBook = z.string().parse(context.params?.hymnBook);

  const bucket = storage.bucket();

  const index = await bucket.file(`${hymnBook}/index.json`).download();

  const hymnsIndex = hymnsIndexSchema.parse(JSON.parse(index[0].toString()));

  const hymnBookInfo = await getHymnBookInfo(hymnBook);

  const hymnBooks = await getHymnBooks();

  return {
    props: {
      hymnsIndex,
      hymnBook: {
        ...hymnBookInfo,
        slug: hymnBook,
      },
      hymnBooks,
    },
  };
};

import { GetStaticPaths, GetStaticProps } from 'next';
import HymnsList from '../../components/HymnsList/HymnsList';
import { storage } from '../../firebase';
import { HymnsIndex, hymnsIndexSchema } from '../../schemas/hymnsIndex';

export default function Home({ hymnsIndex }: { hymnsIndex: HymnsIndex }) {
  return <HymnsList hymnsIndex={hymnsIndex} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { hymnBook: 'hinos-e-canticos' } },
    { params: { hymnBook: 'hinos-espirituais' } },
  ],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async (context) => {
  const hymnBook = context.params?.hymnBook;

  const bucket = storage.bucket();

  const index = await bucket.file(`${hymnBook}/index.json`).download();

  const hymnsIndex = hymnsIndexSchema.parse(JSON.parse(index[0].toString()));

  return {
    props: { hymnsIndex },
  };
};

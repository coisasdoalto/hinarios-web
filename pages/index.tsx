import { GetStaticProps } from 'next';
import HymnsList from '../components/HymnsList/HymnsList';
import { storage } from '../firebase';
import { HymnsIndex, hymnsIndexSchema } from '../schemas/hymnsIndex';

export default function Home({ hymnsIndex }: { hymnsIndex: HymnsIndex }) {
  return <HymnsList hymnsIndex={hymnsIndex} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const bucket = storage.bucket();

  const index = await bucket.file('hinos-e-canticos/index.json').download();

  const hymnsIndex = hymnsIndexSchema.parse(JSON.parse(index[0].toString()));

  return {
    props: { hymnsIndex },
  };
};

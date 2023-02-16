import { HymnBook } from '../schemas/hymnBook';
import { hymnsIndexSchema } from '../schemas/hymnsIndex';
import getParsedData from './getParsedData';

const getHymnsIndex = (hymnBookSlug: string) =>
  getParsedData({
    filePath: `${hymnBookSlug}/index.json`,
    schema: hymnsIndexSchema,
  });

export default getHymnsIndex;

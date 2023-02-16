import { hymnBookInfoSchema } from '../schemas/hymnBookInfo';
import getParsedData from './getParsedData';

const getHymnBookInfo = async (hymnBook: string) =>
  getParsedData({ filePath: `${hymnBook}/hymnBookInfo.json`, schema: hymnBookInfoSchema });

export default getHymnBookInfo;

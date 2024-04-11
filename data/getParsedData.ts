import { readFile } from 'fs/promises';
import path from 'path';
import { ZodType } from 'zod';

export const joinDataPath = (pathToJoin: string) => path.resolve('hymnsData', pathToJoin);

const getParsedData = async <T>({ filePath, schema }: { filePath: string; schema: ZodType<T> }) => {
  const file = await readFile(joinDataPath(filePath));

  return schema.parse(JSON.parse(file.toString()));
};

export default getParsedData;

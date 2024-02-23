import './readEnv';

import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import ProgressBar from 'progress';
import { storage } from '../firebase';

const BASE_PATH = path.join('tmp', 'hymnsData');

async function downloadData() {
  const bucket = storage.bucket();

  const [files] = await bucket.getFiles();

  const filesToDownload = files.filter((file) => !/\/$/.test(file.name));

  const progress = new ProgressBar(
    '  downloading [:bar] :rate/bps :percent :etas :current/:total',
    {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: filesToDownload.length,
    }
  );

  console.log('Downloading ', filesToDownload.length);

  await Promise.all(
    filesToDownload.map(async (file) => {
      const [data] = await file.download();

      const filePath = path.join(BASE_PATH, file.name);

      await mkdir(path.dirname(filePath), { recursive: true });

      await writeFile(filePath, data);

      progress.tick();
    })
  );

  console.log('Saved hymnBooks to ', BASE_PATH);
}

downloadData();

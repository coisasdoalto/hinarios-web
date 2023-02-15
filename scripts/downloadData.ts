/* eslint-disable import/first */

require('dotenv').config({ debug: true, path: '.env.local' });

import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import cliProgress from 'cli-progress';
import { storage } from '../firebase';

async function downloadData() {
  const bucket = storage.bucket();

  const [files] = await bucket.getFiles();

  const filesToDownload = files.filter((file) => !/\/$/.test(file.name));

  const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  progress.start(filesToDownload.length, 0);

  await Promise.all(
    filesToDownload.map(async (file) => {
      const [data] = await file.download();

      const filePath = path.join('tmp', 'hymnsData', file.name);

      await mkdir(path.dirname(filePath), { recursive: true });

      await writeFile(filePath, data);

      progress.increment();
    })
  );

  progress.stop();

  console.log('Saved hymnBooks to .hymnsData');
}

downloadData();

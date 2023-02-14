import slugify from 'slugify';
import { storage } from '../firebase';
import { hymnSchema } from '../schemas/hymn';

async function generateHymnsIndex() {
  const bucket = storage.bucket();

  const [files] = await bucket.getFiles({ prefix: 'hinos-espirituais/' });

  const hymns = (
    await Promise.all(
      files
        .filter((file) => file.name.replace(/\D/g, ''))
        .map(async (file) => {
          const downloaded = await file.download();

          const json = JSON.parse(downloaded[0].toString());

          return hymnSchema.parse(json);
        })
    )
  ).sort((current, next) => Number(current.number) - Number(next.number));

  const index = hymns.map((hymn) => ({
    number: hymn.number,
    title: hymn.title,
    subtitle: hymn.subtitle,
    slug: `${hymn.number}-${slugify(hymn.title)}`,
  }));

  console.log(JSON.stringify(index, null, 2));
}

generateHymnsIndex();

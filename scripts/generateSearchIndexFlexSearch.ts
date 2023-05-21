import { Document, Index } from 'flexsearch';
import { readFile, readdir, writeFile } from 'fs/promises';
import path from 'path';
import slugify from 'slugify';
import getHymnBooks from '../data/getHymnBooks';
import getParsedData, { joinDataPath } from '../data/getParsedData';
import { Hymn, hymnSchema } from '../schemas/hymn';
import { readFileSync, readdirSync, writeFileSync } from 'fs';

const options = {
  document: {
    id: 'id',
    index: ['title', 'subtitle', 'body'],
    store: true,
  },
};

const index = new Document(options);

const composeStanzaText = (stanza?: { number: string | number; text: string }) => {
  if (!stanza) {
    return null;
  }

  return `${stanza.number}. ${stanza.text}`;
};

const composeLyrics = (hymn: Hymn): string => {
  const {
    stanzas: [firstStanza, ...stanzasRest],
    chorus,
  } = hymn;

  return [composeStanzaText(firstStanza), chorus, stanzasRest.map(composeStanzaText)]
    .filter(Boolean)
    .join('\n\n');
};

function exportIndex(flexSearchIndex: Document<unknown, true>) {
  // https://github.com/nextapps-de/flexsearch/issues/299
  // https://github.com/nextapps-de/flexsearch/issues/274
  return new Promise<[string, any][]>((res) => {
    const pkg: [string, any][] = [];
    const expected = new Set([
      'reg',
      'title.cfg',
      'title.map',
      'title.ctx',
      'body.cfg',
      'body.map',
      'body.ctx',
      'body.tag',
      'body.store',
    ]);
    const received = new Set<string>();

    const setsEq = (a: Set<string>, b: Set<string>) => {
      if (a.size !== b.size) {
        return false;
      }

      return Array.from(a).every((el) => b.has(el));
    };

    flexSearchIndex.export((key, data) => {
      // https://github.com/nextapps-de/flexsearch/issues/290
      // https://github.com/nextapps-de/flexsearch/issues/273

      pkg.push([key.toString().split('.').pop()!, data]);
      received.add(key as string);

      if (setsEq(expected, received)) {
        res(pkg);
      }
    });
  });
}

async function generateHymnsIndex() {
  const hymnBooks = await getHymnBooks();

  await Promise.all(
    hymnBooks.map(async (hymnBook) => {
      const hymnFilenames = await Promise.all(
        (
          await readdir(joinDataPath(hymnBook.slug))
        ).filter((hymnFilename) => /\d.*\.json/.test(hymnFilename))
      );

      await (
        await Promise.all(
          hymnFilenames.map(async (hymnFilename) =>
            getParsedData({
              filePath: path.join(hymnBook.slug, hymnFilename),
              schema: hymnSchema,
            })
          )
        )
      )
        .sort(
          (current, next) =>
            parseInt(String(current.number), 10) - parseInt(String(next.number), 10)
        )
        .map((hymn) => ({
          id: `${hymnBook.slug}/${hymn.number}`,
          hymnBook,
          number: hymn.number,
          title: `${hymn.number}. ${hymn.title}`,
          subtitle: hymn.subtitle,
          body: composeLyrics(hymn),
          slug: `${hymn.number}-${slugify(hymn.title)}`,
        }))
        .forEach((hymn) => index.add(hymn));
    })
  );

  // const exportIndex: any = {};

  // await index.export(
  //   (key, data) =>
  //     new Promise<void>((resolve) => {
  //       exportIndex[key] = data;

  //       resolve();
  //     })

  //   // console.log(key);
  // );

  // console.log('the export', exportIndex);

  // const exportedIndex = await exportIndex(index);

  index.export((key, data) =>
    data
      ? writeFileSync(path.join(__dirname, '..', 'search', 'export', `${key}.json`), data as string)
      : null
  );

  // await writeFile(
  //   path.join(__dirname, '..', 'search', 'searchIndex.json'),
  //   JSON.stringify(exportedIndex)
  // );
}

async function testSearch() {
  await generateHymnsIndex();

  const searchResult = index.search('reichgesegnet', { enrich: true });
  console.log(JSON.stringify(searchResult, null, 2));
}

const retrieveIndex = () => {
  const importedIndex = new Document(options);

  const keys = readdirSync(path.join(__dirname, '..', 'search', 'export'), { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => item.name.slice(0, -5));

  for (let i = 0, key; i < keys.length; i += 1) {
    key = keys[i];
    const data = readFileSync(
      path.join(__dirname, '..', 'search', 'export', `${key}.json`),
      'utf8'
    );
    importedIndex.import(key, data ?? null);
  }

  return importedIndex;
};

async function importSearchTest() {
  // const exportedIndex = JSON.parse(
  //   await readFile(path.join(__dirname, '..', 'search', 'searchIndex.json'), { encoding: 'utf-8' })
  // );
  const importedIndex = retrieveIndex();

  const searchResult = importedIndex.search('reichgesegnet', { enrich: true });
  console.log(JSON.stringify(searchResult, null, 2));
}

console.log(testSearch, importSearchTest);

testSearch();
// importSearchTest();

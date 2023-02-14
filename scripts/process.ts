import { writeFile } from 'fs/promises';
import path from 'path';
import hinosEspirituais from './hinosEspirituais.json';

async function process() {
  await Promise.all(
    hinosEspirituais.map((hymn) =>
      writeFile(
        path.join(__dirname, 'output', `${String(hymn.number)}.json`),
        JSON.stringify(
          {
            ...hymn,
            subtitle: hymn.originalNumber
              ? `${hymn.originalNumber}. ${hymn.originalTitle}`
              : hymn.originalTitle,
          },
          null,
          2
        )
      )
    )
  );
}

process();

import elasticlunr from 'elasticlunr';

import searchIndexJson from './searchIndex.json';

const searchIndex = elasticlunr.Index.load(searchIndexJson as any);

const result = searchIndex.search('pai');

console.log(result);

console.log(searchIndex.documentStore.getDoc(result[0].ref));

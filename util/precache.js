const path = require('path');
const fs = require('fs');
const { readFile } = require('fs/promises');

async function getAllPaths() {
  const paths = JSON.parse(
    await readFile(path.join('tmp', 'pathsForPrecache.json'), { encoding: 'utf-8' })
  );

  return paths;
}

// utility functions copied from lib/data.js since you can't import it
function readJsonFile(dataFile) {
  let json = fs.readFileSync(dataFile, { encoding: 'utf8' });
  return JSON.parse(json);
}

function getAllCreatures() {
  const dataDir = path.posix.join(process.cwd(), 'data');

  let rawObj = readJsonFile(path.posix.join(dataDir, 'creatures_list.json'));
  // version checking would take place here if needed

  // filter out creatures with ruleMaturity > 2, to reproduce the behaviour in getAllData
  let data = rawObj.data.filter((item) => item.ruleMaturity <= 2);

  return data;
}
// end of utility functions from lib/data.js

// extract the list of all denizen pages
function getDenizenPages() {
  let denizens = getAllCreatures();
  return denizens.map((denizen) => denizen.code);
}

function getPageJSONPath(buildId, pageRoute) {
  return path.posix.join('/_next/data/', buildId, `${pageRoute}.json`);
}

function getJSONEntry(buildId, pageRoute) {
  return {
    url: getPageJSONPath(buildId, pageRoute),
    revision: null,
  };
}

function getHTMLEntry(buildId, pageRoute) {
  return {
    url: pageRoute,
    revision: buildId,
  };
}

function getNormalPageEntries(buildId, page) {
  let entries = [];
  if (page.precacheHtml) {
    entries.push(getHTMLEntry(buildId, page.route));
  }
  if (page.precacheJson) {
    entries.push(getJSONEntry(buildId, page.route));
  }
  return entries;
}

function getDynamicPageEntries(buildId, page) {
  let pageList = page.dynamicPages.map((actualPage) => path.posix.join(page.route, actualPage));
  let entries = pageList.map((route) =>
    getNormalPageEntries(buildId, {
      route: route,
      precacheHtml: page.precacheHtml,
      precacheJson: page.precacheJson,
    })
  );
  return entries.reduce((acc, curr) => acc.concat(curr), []);
}

function getPageEntries(buildId, page) {
  if (Array.isArray(page.dynamicPages)) {
    return getDynamicPageEntries(buildId, page);
  } else {
    return getNormalPageEntries(buildId, page);
  }
}

async function getGeneratedPrecacheEntries(buildId) {
  if (typeof buildId !== 'string') {
    console.error('getGeneratedPrecacheEntries: buildId should be a string', buildId);
    return;
  } else if (buildId === '') {
    console.error('getGeneratedPrecacheEntries: buildId cannot be an empty string');
    return;
  }

  const allPaths = await getAllPaths();

  const paths = {
    'corinhos-e-canticos-de-salvacao': allPaths
      .filter((path) => path.includes('corinhos-e-canticos-de-salvacao'))
      .slice(0, 2)
      .map((hymn) => hymn.replace('corinhos-e-canticos-de-salvacao', '')),
    'hinos-e-canticos': allPaths
      .filter((path) => path.includes('hinos-e-canticos'))
      .slice(0, 2)
      .map((hymn) => hymn.replace('hinos-e-canticos', '')),
    'hinos-espirituais': allPaths
      .filter((path) => path.includes('hinos-espirituais'))
      .slice(0, 2)
      .map((hymn) => hymn.replace('hinos-espirituais', '')),
  };

  const pages = [
    {
      route: '/',
      precacheHtml: true, // next-pwa already caches the home page
      precacheJson: true, // no props
    },
    {
      route: '/sobre',
      precacheHtml: true,
      precacheJson: false,
    },
    {
      route: '/corinhos-e-canticos-de-salvacao',
      dynamicPages: paths['corinhos-e-canticos-de-salvacao'],
      precacheHtml: true,
      precacheJson: true,
    },
    {
      route: '/hinos-e-canticos',
      dynamicPages: paths['hinos-e-canticos'],
      precacheHtml: true,
      precacheJson: true,
    },
    {
      route: '/hinos-espirituais',
      dynamicPages: paths['hinos-espirituais'],
      precacheHtml: true,
      precacheJson: true,
    },
  ];

  console.log('the pages', pages);

  return pages
    .map((page) => getPageEntries(buildId, page))
    .reduce((acc, curr) => acc.concat(curr), []);
}

module.exports = getGeneratedPrecacheEntries;

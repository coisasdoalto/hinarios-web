import { ActionIcon, DefaultProps, Group, MediaQuery, Text, UnstyledButton } from '@mantine/core';
import { useOs } from '@mantine/hooks';
import type { SpotlightAction } from '@mantine/spotlight';
import { SpotlightProvider, openSpotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons';
import elasticlunr from 'elasticlunr';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HymnBook } from '../../schemas/hymnBook';
import searchIndexJson from '../../search/searchIndex.json';
import useStyles from './SearchControl.styles';

const searchIndex = elasticlunr.Index.load<{
  title: string;
  body: string;
  slug: string;
  hymnBook: HymnBook;
}>(searchIndexJson as any);

interface SearchControlProps extends DefaultProps, React.ComponentPropsWithoutRef<'button'> {
  onClick(): void;
}

export function SearchControl({ className, ...others }: SearchControlProps) {
  const { classes, cx } = useStyles();

  const [mac, setMac] = useState(false);

  const os = useOs();

  useEffect(() => {
    if (os === 'macos') {
      return setMac(true);
    }

    return setMac(false);
  }, [os]);

  return (
    <>
      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <UnstyledButton {...others} className={cx(classes.root, className)}>
          <Group spacing="xs">
            <IconSearch size={14} stroke={1.5} />
            <Text size="sm" color="dimmed" pr={80}>
              Buscar
            </Text>
            <Text weight={700} className={classes.shortcut}>
              {mac ? '⌘' : 'Ctrl'} + K
            </Text>
          </Group>
        </UnstyledButton>
      </MediaQuery>
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <ActionIcon variant="outline" {...others}>
          <IconSearch size={18} stroke={1.5} />
        </ActionIcon>
      </MediaQuery>
    </>
  );
}

const actions: SpotlightAction[] = [];

const search = (router: NextRouter) => (query: string) => {
  const results = searchIndex.search(query, {
    fields: { title: { boost: 1 }, body: { boost: 1 } },
  });

  const filteredData: SpotlightAction[] = results.map((result) => {
    const doc = searchIndex.documentStore.getDoc(result.ref);

    const href = `/${doc.hymnBook.slug}/${doc.slug}`;

    return {
      title: doc.title,
      description: `${doc.body.slice(0, 90)}...`,
      onTrigger: () => router.push(href),
      group: doc.hymnBook.name,
    };
  });

  return filteredData;
};

function Search() {
  const router = useRouter();

  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="Buscar..."
      shortcut={['mod + P', 'mod + K', '/']}
      nothingFoundMessage="Nada encontrado..."
      filter={search(router)}
    >
      <SearchControl onClick={() => openSpotlight()} />
    </SpotlightProvider>
  );
}

export default Search;

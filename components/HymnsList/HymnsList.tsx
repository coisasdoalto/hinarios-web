import { Fragment, useState } from 'react';
import { Box, Group, NavLink, Space, Text, Title } from '@mantine/core';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import { HymnsIndex } from '../../schemas/hymnsIndex';
import BackButton from '../BackButton/BackButton';
import { HymnBook } from '../../schemas/hymnBook';

function HymnsList({ hymnsIndex, hymnBook }: { hymnsIndex: HymnsIndex; hymnBook: HymnBook }) {
  const [active, setActive] = useState(0);

  const items = hymnsIndex
    .slice(0, hymnBook.slug === 'hinos-e-canticos' ? 3 : undefined)
    .map((item, index) => (
      <Fragment key={item.number}>
        <LazyLoad height={59.39} offset={200} once>
          <NavLink
            key={item.number}
            active={index === active}
            label={item.title}
            description={item.subtitle}
            // rightSection={
            //   <Group>
            //     <IconStar size={16} stroke={1.5} />
            //     <IconHeadphones size={16} stroke={1.5} onClick={() => console.log('play')} />
            //   </Group>
            // }
            icon={
              <Text sx={{ minWidth: 29, textAlign: 'right', fontFamily: 'mono' }} size="sm">
                {item.number}
              </Text>
            }
            onClick={() => setActive(index)}
            component={Link}
            href={`${hymnBook.slug}/${item.slug}`}
          />
        </LazyLoad>
      </Fragment>
    ));

  return (
    <>
      <Group>
        <BackButton />

        <Title order={1} size="h2">
          {hymnBook.name}
        </Title>
      </Group>

      <Space h="lg" />

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>{items}</Box>
    </>
  );
}

export default HymnsList;

import { useState } from 'react';
import { IconHeadphones, IconStar } from '@tabler/icons';
import { Box, Group, NavLink, Text } from '@mantine/core';
import { HymnsIndex } from '../../schemas/hymnsIndex';

function HymnsList({ hymnsIndex }: { hymnsIndex: HymnsIndex }) {
  const [active, setActive] = useState(0);

  const items = hymnsIndex.map((item, index) => (
    <NavLink
      key={item.number}
      active={index === active}
      label={item.title}
      description={item.subtitle}
      rightSection={
        <Group>
          <IconStar size={16} stroke={1.5} />
          <IconHeadphones size={16} stroke={1.5} onClick={() => console.log('play')} />
        </Group>
      }
      icon={
        <Text sx={{ minWidth: 29, textAlign: 'right', fontFamily: 'mono' }} size="sm">
          {item.number}
        </Text>
      }
      onClick={() => setActive(index)}
      component="a"
      href={`hinos-e-canticos/${item.slug}`}
    />
  ));

  return <Box>{items}</Box>;
}

export default HymnsList;

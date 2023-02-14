import { useState } from 'react';
import { IconHeadphones, IconStar } from '@tabler/icons';
import { Box, Button, Group, NavLink, Space, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { HymnsIndex } from '../../schemas/hymnsIndex';
import BackButton from '../BackButton/BackButton';

function HymnsList({ hymnsIndex }: { hymnsIndex: HymnsIndex }) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => setShowAll((currentValue) => !currentValue);

  const [active, setActive] = useState(0);

  const items = hymnsIndex.slice(0, showAll ? undefined : 20).map((item, index) => (
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
      href={`hinos-e-canticos/${item.slug}`}
    />
  ));

  return (
    <>
      <Group>
        <BackButton />

        <Title order={1} size="h2">
          Hinos e Cânticos
        </Title>
      </Group>

      <Space h="lg" />

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {items}
        <Button variant="outline" sx={{ alignSelf: 'center' }} my={16} onClick={toggleShowAll}>
          {showAll ? 'Mostrar menos' : 'Mostrar tudo'}
        </Button>
      </Box>
    </>
  );
}

export default HymnsList;

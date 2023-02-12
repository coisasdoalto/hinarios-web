import { useState } from 'react';
import {
  IconGauge,
  IconFingerprint,
  IconActivity,
  IconChevronRight,
  IconPlayerPlay,
  IconHeadphones,
  IconStar,
} from '@tabler/icons';
import { Box, Group, NavLink, Text } from '@mantine/core';

const data = [
  { icon: '1', label: 'A divinal mensagem', description: 'Stuart Edmund Mc Nair' },
  {
    icon: '201',
    label: 'Preciso de Jesus',
    description: 'Sarah Poulton Kalley',
  },
  { icon: '764', label: 'Graça damos', description: 'William Anglin' },
];

function Demo() {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      // rightSection={item.rightSection}
      rightSection={
        <Group>
          <IconStar size={16} stroke={1.5} />
          <IconHeadphones size={16} stroke={1.5} onClick={() => console.log('play')} />
        </Group>
      }
      // icon={<item.icon size={16} stroke={1.5} />}
      icon={
        <Text sx={{ minWidth: 29, textAlign: 'right', fontFamily: 'mono' }} size="sm">
          {item.icon}
        </Text>
      }
      onClick={() => setActive(index)}
    />
  ));

  return <Box>{items}</Box>;
}

export default Demo;

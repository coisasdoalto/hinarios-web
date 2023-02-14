import { Box, NavLink } from '@mantine/core';
import { IconInfoSquare, IconBooks, IconHome } from '@tabler/icons';
import Link from 'next/link';

function VerticalNavigation() {
  return (
    <Box>
      {/* <NavLink label="Favoritos" icon={<IconBookmarks size={16} stroke={1.5} />} /> */}
      <NavLink
        label="Início"
        icon={<IconHome size={16} stroke={1.5} />}
        component={Link}
        href="/"
      />

      <NavLink
        label="Hinários"
        icon={<IconBooks size={16} stroke={1.5} />}
        childrenOffset={28}
        defaultOpened
      >
        <NavLink label="Hinos e Cânticos" component={Link} href="/hinos-e-canticos" />
        {/* <NavLink label="Hinos Espirituais" /> */}
      </NavLink>

      <NavLink
        label="Sobre"
        icon={<IconInfoSquare size={16} stroke={1.5} />}
        component={Link}
        href="/sobre"
      />
    </Box>
  );
}

export default VerticalNavigation;

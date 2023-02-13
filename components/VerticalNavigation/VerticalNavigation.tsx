import { Box, NavLink } from '@mantine/core';
import {
  IconGauge,
  IconFingerprint,
  IconBook,
  IconBookmarks,
  IconInfoSquare,
  IconBooks,
} from '@tabler/icons';

function VerticalNavigation() {
  return (
    <Box>
      <NavLink label="Favoritos" icon={<IconBookmarks size={16} stroke={1.5} />} />

      <NavLink label="Hinários" icon={<IconBooks size={16} stroke={1.5} />} childrenOffset={28}>
        <NavLink label="Hinos e Cânticos" />
        <NavLink label="Hinos Espirituais" />
      </NavLink>

      <NavLink label="Sobre" icon={<IconInfoSquare size={16} stroke={1.5} />} />
    </Box>
  );
}

export default VerticalNavigation;

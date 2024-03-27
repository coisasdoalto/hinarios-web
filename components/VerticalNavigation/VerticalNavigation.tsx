import { Box, Divider, NavLink } from '@mantine/core';
import { IconBooks, IconHome, IconInfoSquare } from '@tabler/icons';
import Link from 'next/link';
import { useHymnBooks } from '../../context/HymnBooks';
import { DarkModeToggle } from './DarkModeToggle';

function VerticalNavigation({ onNavigation }: { onNavigation: () => void }) {
  const [hymnBooks] = useHymnBooks();

  return (
    <Box>
      {/* <NavLink label="Favoritos" icon={<IconBookmarks size={16} stroke={1.5} />} /> */}
      <NavLink
        label="Início"
        icon={<IconHome size={16} stroke={1.5} />}
        component={Link}
        href="/"
        onClick={onNavigation}
      />

      <NavLink
        label="Hinários"
        icon={<IconBooks size={16} stroke={1.5} />}
        childrenOffset={28}
        defaultOpened
      >
        {hymnBooks?.map((hymnBook) => (
          <NavLink
            key={hymnBook.slug}
            label={hymnBook.name}
            component={Link}
            href={`/${hymnBook.slug}`}
            onClick={onNavigation}
          />
        ))}
      </NavLink>

      <NavLink
        label="Sobre"
        icon={<IconInfoSquare size={16} stroke={1.5} />}
        component={Link}
        href="/sobre"
        onClick={onNavigation}
      />

      <Divider my="md" label="Configurações" labelPosition="center" />

      <DarkModeToggle />
    </Box>
  );
}

export default VerticalNavigation;

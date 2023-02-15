import { Box, NavLink } from '@mantine/core';
import { IconInfoSquare, IconBooks, IconHome } from '@tabler/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { HymnBook, hymnBookSchema } from '../../schemas/hymnBook';

function VerticalNavigation() {
  const [hymnBooks, setHymnBooks] = useState<HymnBook[] | null>(null);

  useEffect(() => {
    try {
      const hymnBooksParsed = z
        .array(hymnBookSchema)
        .parse(JSON.parse(localStorage.getItem('hymnBooks') || ''));

      setHymnBooks(hymnBooksParsed);
    } catch (error) {
      console.error('Error while loading hymnBooks for side menu navigation.');
      console.error(error);
    }
  }, []);

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
        {hymnBooks?.map((hymnBook) => (
          <NavLink
            key={hymnBook.slug}
            label={hymnBook.name}
            component={Link}
            href={`/${hymnBook.slug}`}
          />
        ))}
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

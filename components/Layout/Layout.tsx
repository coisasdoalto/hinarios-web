import { PropsWithChildren, useState } from 'react';
import {
  AppShell as MantineAppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Container,
  Button,
  Breadcrumbs,
} from '@mantine/core';

import VerticalNavigation from '../VerticalNavigation/VerticalNavigation';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { useRouter } from 'next/router';

export default function AppShell({ children }: PropsWithChildren) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <MantineAppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <VerticalNavigation />
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          audio player
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Button sx={{ marginRight: 'auto' }} variant="subtle" component="a" href="/">
              Hinários Web
            </Button>

            <DarkModeToggle />
          </div>
        </Header>
      }
    >
      <Container px={0}>{children}</Container>
    </MantineAppShell>
  );
}

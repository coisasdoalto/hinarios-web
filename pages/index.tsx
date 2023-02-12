import { useState } from 'react';
import {
  AppShell as MantineAppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Container,
} from '@mantine/core';
import HymnsList from '../components/HymnsList/HymnsList';
import VerticalNavigation from '../components/VerticalNavigation/VerticalNavigation';

export default function AppShell() {
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

            <Text>Hinários Web</Text>
          </div>
        </Header>
      }
    >
      <Container px={0}>
        <HymnsList />
      </Container>
    </MantineAppShell>
  );
}

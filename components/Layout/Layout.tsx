import { PropsWithChildren, useState } from 'react';
import {
  AppShell as MantineAppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Container,
  Button,
  TextInput,
  Group,
  Textarea,
  Box,
} from '@mantine/core';

import VerticalNavigation from '../VerticalNavigation/VerticalNavigation';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import Search from '../Search/Search';

export default function AppShell({ children }: PropsWithChildren) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [feedbackEnabled, setFeedbackEnabled] = useState(false);

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
          <VerticalNavigation
            onNavigation={() => {
              setOpened(false);
            }}
          />
        </Navbar>
      }
      // footer={
      //   <Footer height={60} p="md">
      //     audio player
      //   </Footer>
      // }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Button variant="subtle" component="a" href="/" sx={{ marginRight: 'auto' }}>
              Hinários
            </Button>

            <Search />

            <DarkModeToggle />
          </div>
        </Header>
      }
    >
      <Container px={0} py={16}>
        {children}
      </Container>

      <Container size="xs" mt="xl">
        {/* <Box>Encontrou um erro ou tem uma sugestão? Escreva aqui</Box> */}
        <form action="https://formspree.io/f/xayzroby" method="POST">
          <Textarea
            placeholder="Encontrou um erro ou tem uma sugestão? Escreva aqui"
            label={feedbackEnabled ? 'Feedback' : undefined}
            name={feedbackEnabled ? 'feedback' : undefined}
            onClick={() => setFeedbackEnabled(true)}
            withAsterisk
          />

          {feedbackEnabled && (
            <>
              <TextInput label="Nome (opcional)" placeholder="Seu nome" name="name" />

              <TextInput label="Contato (opcional)" placeholder="email ou whats" name="contact" />

              <Group position="right" mt="md">
                <Button type="submit">Enviar</Button>
              </Group>
            </>
          )}
        </form>
      </Container>
    </MantineAppShell>
  );
}

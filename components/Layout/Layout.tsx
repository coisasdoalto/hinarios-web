import {
  Anchor,
  Box,
  Breadcrumbs,
  Burger,
  Button,
  Container,
  Group,
  Header,
  AppShell as MantineAppShell,
  MediaQuery,
  Navbar,
  Text,
  TextInput,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { PropsWithChildren, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useHymnBooks } from '../../context/HymnBooks';
import LoginMenu from '../LoginMenu';
import Search from '../Search/Search';
import VerticalNavigation from '../VerticalNavigation/VerticalNavigation';
import { useFeatureFlagEnabled } from 'posthog-js/react';

export default function AppShell({ children }: PropsWithChildren) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [feedbackEnabled, setFeedbackEnabled] = useState(false);
  const [feedbackValue, setFeedbackValue] = useState('');

  const router = useRouter();

  const [hymnBooks] = useHymnBooks();

  const hymnBook = hymnBooks?.find((item) => item.slug === router.query.hymnBook);

  const shouldUseBetaTesterInviteModal = useFeatureFlagEnabled('beta-tester-invite-modal');

  useEffect(() => {
    setFeedbackEnabled(false);
  }, []);

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

            <Breadcrumbs sx={{ marginRight: 'auto' }}>
              <Button variant="subtle" component={Link} href="/" compact>
                Hinários
              </Button>
              {hymnBook && (
                <Button variant="subtle" component={Link} href={`/${hymnBook.slug}`} compact>
                  {hymnBook.name
                    .split(' ')
                    .map((item) => item[0])
                    .filter((item) => /[A-Z]/.test(item))
                    .join('')}
                </Button>
              )}
            </Breadcrumbs>

            <Group spacing="xs">
              <Search />

              <LoginMenu />
            </Group>
          </div>
        </Header>
      }
    >
      <Container px={0} py={16}>
        {children}
      </Container>

      <Container size="xs" mt="xl">
        <form action="https://formspree.io/f/xayzroby" method="POST">
          <Textarea
            placeholder="Encontrou um erro ou tem uma sugestão? Escreva aqui"
            label={feedbackEnabled ? 'Feedback' : undefined}
            name={feedbackEnabled ? 'feedback' : undefined}
            value={feedbackValue}
            onChange={(event) => setFeedbackValue(event.target.value)}
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

      {shouldUseBetaTesterInviteModal && (
        <Container size="xs" mt="xl">
          <Box
            sx={(theme) => ({
              border: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[4]
              }`,
              borderRadius: theme.radius.sm,
              padding: theme.spacing.md,
            })}
          >
            <Text>Graças à sua ajuda conseguimos publicar o app na Play Store!</Text>

            <Text>
              <Anchor
                href="https://play.google.com/store/apps/details?id=app.hinarios.twa"
                target="_blank"
              >
                Clique aqui
              </Anchor>{' '}
              para instalar.
            </Text>
          </Box>
        </Container>
      )}
    </MantineAppShell>
  );
}

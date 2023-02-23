import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import posthog from 'posthog-js';
import Layout from '../components/Layout/Layout';
import useColorScheme from '../hooks/useColorScheme';
import { HymnBooksProvider, useCreateHymnBooksCache } from '../context/HymnBooks';

if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
  posthog.init('phc_sHWgUAgxkRXAAv7NSyPnkUWaOzM0hnccRL644rlXpb1', {
    api_host: 'https://app.posthog.com',
  });
}

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const hymnBooksCache = useCreateHymnBooksCache();

  return (
    <>
      <Head>
        <title>Hinários</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <HymnBooksProvider hymnBooksCache={hymnBooksCache}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </HymnBooksProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

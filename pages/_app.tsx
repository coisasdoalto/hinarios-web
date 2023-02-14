import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import posthog from 'posthog-js';
import Layout from '../components/Layout/Layout';
import useColorScheme from '../hooks/useColorScheme';

if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
  posthog.init('phc_sHWgUAgxkRXAAv7NSyPnkUWaOzM0hnccRL644rlXpb1', {
    api_host: 'https://app.posthog.com',
  });
}

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;

  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

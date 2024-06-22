import { Space, TypographyStylesProvider } from '@mantine/core';

import { CONTACT_EMAIL } from 'contants';

export default function Home() {
  return (
    <>
      <Space h="lg" />
      <TypographyStylesProvider>
        <p>Este projeto é um agregador de hinários para uso pessoal online ou offline.</p>

        <p>
          Este projeto não tem qualquer ligação ou filiação com as editoras ou publicadoras dos
          respectivos hinários e hinos.
        </p>

        <p>
          Caso queira enviar um hinário, hino, correção, áudio, sugestões, ou tratar qualquer outro
          assunto, envie um e-mail para {CONTACT_EMAIL}.
        </p>
      </TypographyStylesProvider>
    </>
  );
}

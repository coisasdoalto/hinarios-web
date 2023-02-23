import { AppProps } from 'next/app';
import { Box, Container, MantineSize, SegmentedControl, Space, Text, Title } from '@mantine/core';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Fragment, useEffect, useState } from 'react';
import { z } from 'zod';
import { Hymn, hymnSchema } from '../../schemas/hymn';
import BackButton from '../../components/BackButton/BackButton';
import getHymnBooks from '../../data/getHymnBooks';
import { HymnBook } from '../../schemas/hymnBook';
import { useHymnBooksSave } from '../../context/HymnBooks';
import getParsedData from '../../data/getParsedData';
import getHymnsIndex from '../../data/getHymnsIndex';

const AddBreakLine = ({ children }: { children: string }) => (
  <>
    {children.split('\n').map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ))}
  </>
);

const validateFontSize = (fontSize: string): fontSize is MantineSize => /md|lg|xl/.test(fontSize);

type PageProps = { content: Hymn; hymnBooks: HymnBook[] };

export default function HymnView(props: AppProps & PageProps) {
  const {
    content: { number, title, subtitle, stanzas, chorus },
  } = props;

  useHymnBooksSave(props.hymnBooks);

  const [fontSize, setFontSize] = useState<MantineSize>('md');

  useEffect(() => {
    const localStorageFontSize = localStorage.getItem('fontSize') || '';

    if (validateFontSize(localStorageFontSize)) {
      setFontSize(localStorageFontSize);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  const chorusComponent = chorus && (
    <Text size={fontSize} mt={16} pl={40} italic>
      <AddBreakLine>{chorus}</AddBreakLine>
    </Text>
  );

  return (
    <Container size="xs">
      <BackButton />

      <Space h="md" />

      <Title order={1} size="h2">
        {number}. {title}
      </Title>
      {subtitle && (
        <Title order={5} color="dimmed" italic>
          {subtitle}
        </Title>
      )}

      <Space h="md" />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <SegmentedControl
          value={fontSize}
          onChange={(value: MantineSize) => setFontSize(value)}
          data={[
            { label: 'Pequeno', value: 'md' },
            { label: 'Médio', value: 'lg' },
            { label: 'Grande', value: 'xl' },
          ]}
        />
      </Box>

      {!stanzas.length && <Box mt={16}>{chorusComponent}</Box>}

      {stanzas.map((stanza, index) => (
        <Fragment key={stanza.number}>
          {/* <Text>{stanza.number}.</Text> */}
          <Text size={fontSize} mt={16} pl={20} style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0 }}>{stanza.number}.</span>
            <AddBreakLine>{stanza.text}</AddBreakLine>
          </Text>

          {index === 0 && chorus && chorusComponent}
        </Fragment>
      ))}
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const hymnBooks = await getHymnBooks();

  const allPaths = (
    await Promise.all(
      hymnBooks.map(async (hymnBook) => {
        const hymnsIndex = await getHymnsIndex(hymnBook.slug);

        const paths = hymnsIndex.map(({ slug }) => ({
          params: { hymnBook: hymnBook.slug, slug },
        }));

        return paths;
      })
    )
  ).flat();

  return {
    paths: allPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const hymnBook = z.string().parse(context.params?.hymnBook);
  const hymnNumber = String(context.params?.slug)?.split('-')[0];

  const content = await getParsedData({
    filePath: `${hymnBook}/${hymnNumber}.json`,
    schema: hymnSchema,
  });

  const hymnBooks = await getHymnBooks();

  return {
    props: { content, hymnBooks },
  };
};

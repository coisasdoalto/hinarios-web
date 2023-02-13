import { AppProps } from 'next/app';
import { ActionIcon, Anchor, Breadcrumbs, Button, Container, Text, Title } from '@mantine/core';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Fragment } from 'react';
import { storage } from '../../firebase';
import { Hymn, hymnSchema } from '../../schemas/hymn';
import { hymnsIndexSchema } from '../../schemas/hymnsIndex';
import { useRouter } from 'next/router';
import { IconArrowBack, IconArrowLeft, IconChevronLeft } from '@tabler/icons';

const AddBreakLine = ({ children }: { children: string }) => (
  <>
    {children.split('\n').map((line) => (
      <Fragment key={line}>
        {line}
        <br />
      </Fragment>
    ))}
  </>
);

enum HymnsSlugs {
  HC = 'hinos-e-canticos',
  HE = 'hinos-espirituais',
}

const hymnBookMapperFromSlug = (slug: HymnsSlugs) =>
  ({
    [HymnsSlugs.HC]: 'Hinos e Cânticos',
    [HymnsSlugs.HE]: 'Hinos Espirituais',
  }[slug]);

export default function HymnView(props: AppProps & { content: Hymn }) {
  const {
    content: { number, title, subtitle, stanzas, chorus },
  } = props;

  const router = useRouter();

  const [hymnBook] = router.asPath.split('/').filter(Boolean);

  const items = [
    { title: hymnBookMapperFromSlug(hymnBook), href: `/${hymnBook}` },
    { title: `Hino ${number}`, href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>

      <Container size="xs">
        <Button
          leftIcon={<IconChevronLeft />}
          color="gray"
          variant="outline"
          onClick={() => router.back()}
          title="Voltar"
        >
          Voltar
        </Button>

        <Title order={1}>
          {number}. {title}
        </Title>
        {subtitle && (
          <Title order={5} color="dimmed" italic>
            {subtitle}
          </Title>
        )}

        {stanzas.map((stanza, index) => (
          <Fragment key={stanza.number}>
            {/* <Text>{stanza.number}.</Text> */}
            <Text mt={16} pl={20} style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0 }}>{stanza.number}.</span>
              <AddBreakLine>{stanza.text}</AddBreakLine>
            </Text>

            {index === 0 && chorus && (
              <Text mt={16} pl={40} italic>
                <AddBreakLine>{chorus}</AddBreakLine>
              </Text>
            )}
          </Fragment>
        ))}
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const bucket = storage.bucket();

  const index = await bucket.file('hinos-e-canticos/index.json').download();

  const hymnsIndex = hymnsIndexSchema.parse(JSON.parse(index[0].toString()));

  const paths = hymnsIndex.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const hymnNumber = String(context.params?.slug)?.split('-')[0];

  const bucket = storage.bucket();

  const file = await (await bucket.file(`hinos-e-canticos/${hymnNumber}.json`)).download();

  const json = JSON.parse(file[0].toString());

  const content = hymnSchema.parse(json);

  return {
    props: { content },
  };
};

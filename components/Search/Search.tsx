import { forwardRef, useState } from 'react';
import {
  Group,
  Avatar,
  Text,
  MantineColor,
  SelectItemProps,
  Autocomplete,
  AutocompleteItem,
} from '@mantine/core';
import elasticlunr from 'elasticlunr';
import searchIndexJson from '../../scripts/searchIndex.json';

const charactersList = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking, though has no sense of taste',
  },

  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    label: 'Carol Miller',
    description: 'One of the richest people on Earth',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    label: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
    label: 'Spongebob Squarepants',
    description: 'Not just a sponge',
  },
];

// const data = charactersList.map((item) => ({ ...item, value: item.label }));

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  body: string;
  image: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ body, value, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text>{value}</Text>
          <Text size="xs" color="dimmed">
            {body}
          </Text>
        </div>
      </Group>
    </div>
  )
);

const searchIndex = elasticlunr.Index.load<{ title: string }>(searchIndexJson as any);

function Search() {
  const [value, setValue] = useState('');

  const results = searchIndex.search(value, {}).slice(0, 5);

  const filteredData: AutocompleteItem[] = results.map((result) => {
    const doc = searchIndex.documentStore.getDoc(result.ref);
    return {
      ...doc,
      value: doc.title,
    };
  });

  console.log(results, filteredData);

  return (
    <Autocomplete
      //       label="Choose employee of the month"
      value={value}
      onChange={setValue}
      placeholder="Buscar hino"
      itemComponent={AutoCompleteItem}
      data={filteredData}
      //       filter={(value, item) =>
      //         item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
      //         item.description.toLowerCase().includes(value.toLowerCase().trim())
      //       }
    />
  );
}

export default Search;

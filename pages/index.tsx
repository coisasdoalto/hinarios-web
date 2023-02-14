import { Card, Group, Text } from '@mantine/core';
import Link from 'next/link';

export default function Home() {
  return (
    <Group mt={16}>
      <Card shadow="sm" p="xl" component={Link} href="/hinos-e-canticos">
        <Text weight={500} size="lg" m={0}>
          Hinos e Cânticos
        </Text>
      </Card>
    </Group>
  );
}

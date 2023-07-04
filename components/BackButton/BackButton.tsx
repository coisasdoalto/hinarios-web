import { Button } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons';
import { useRouter } from 'next/router';

const BackButton = ({ to }: { to?: string }) => {
  const router = useRouter();

  return (
    <Button
      leftIcon={<IconChevronLeft />}
      color="gray"
      variant="outline"
      onClick={() => {
        if (to) {
          router.push(`/${to}`);
          return;
        }

        router.back();
      }}
      title="Voltar"
    >
      Voltar
    </Button>
  );
};

export default BackButton;

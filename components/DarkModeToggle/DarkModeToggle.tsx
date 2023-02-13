import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars, IconBulb, IconBulbOff } from '@tabler/icons';

function DarkModeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'gray' : 'dark'}
      onClick={() => toggleColorScheme()}
      title="Acender/desligar a luz"
    >
      {dark ? <IconBulb size={18} /> : <IconBulbOff size={18} />}
    </ActionIcon>
  );
}

export default DarkModeToggle;

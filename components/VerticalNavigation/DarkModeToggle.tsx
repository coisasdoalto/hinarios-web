import { NavLink, useMantineColorScheme } from '@mantine/core';
import { IconBulb, IconBulbOff } from '@tabler/icons';

export function DarkModeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const isDarkTheme = colorScheme === 'dark';

  return (
    <NavLink
      label={isDarkTheme ? 'Ligar a luz' : 'Desligar a luz'}
      icon={
        isDarkTheme ? <IconBulb size={16} stroke={1.5} /> : <IconBulbOff size={16} stroke={1.5} />
      }
      onClick={() => toggleColorScheme()}
    />
  );
}

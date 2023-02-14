import { ColorScheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const colorSchemeSchema = z.union([z.literal('light'), z.literal('dark')]).catch('dark');

const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  useEffect(() => {
    const savedColorScheme = colorSchemeSchema.parse(localStorage.getItem('color-scheme'));
    setColorScheme(savedColorScheme);
    window.addEventListener(
      'storage',
      (event) => {
        if (event.key === 'color-scheme') {
          setColorScheme(colorSchemeSchema.parse(event.newValue));
        }
      },
      false
    );
  }, []);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);

    localStorage.setItem('color-scheme', nextColorScheme);
  };

  return {
    colorScheme,
    toggleColorScheme,
  };
};

export default useColorScheme;

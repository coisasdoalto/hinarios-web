import { useEffect, useState } from 'react';
import { z } from 'zod';
import { HymnBook, hymnBookSchema } from '../schemas/hymnBook';

export const useHymnBooksSave = (hymnBooks: HymnBook[]) =>
  useEffect(() => {
    localStorage.setItem('hymnBooks', JSON.stringify(hymnBooks));
  }, []);

export const useHymnBooksLoad = () => {
  const [hymnBooks, setHymnBooks] = useState<HymnBook[] | null>(null);

  useEffect(() => {
    try {
      const hymnBooksParsed = z
        .array(hymnBookSchema)
        .parse(JSON.parse(localStorage.getItem('hymnBooks') || ''));

      setHymnBooks(hymnBooksParsed);
    } catch (error) {
      console.error('Error while loading hymnBooks for side menu navigation.');
      console.error(error);
    }
  }, []);

  return hymnBooks;
};

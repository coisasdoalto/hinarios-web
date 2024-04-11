import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Hymn } from 'schemas/hymn';
import { HymnBookInfo } from 'schemas/hymnBookInfo';

type UseHymnData = Pick<Hymn, 'title'> & {
  hymnBook: HymnBookInfo;
};

export function useHymn({ hymnNumber, hymnBook }: { hymnNumber: number; hymnBook: string }) {
  return useQuery({
    queryKey: ['hymns', hymnNumber, hymnBook],
    queryFn: async () => {
      const response = await axios.get<UseHymnData>(`/api/hymns/${hymnBook}/${hymnNumber}`);

      return response.data;
    },
  });
}

import CorinhosECanticosDeSalvacao from '../hymnsData/corinhos-e-canticos-de-salvacao/index.json';
import HinosECanticos from '../hymnsData/hinos-e-canticos/index.json';
import HinosEspirituais from '../hymnsData/hinos-espirituais/index.json';
import { HymnBookSlug } from '../types/HymnBooks';

export function useHymn({ hymnNumber, hymnBook }: { hymnNumber: number; hymnBook: HymnBookSlug }) {
  if (hymnBook === 'hinos-espirituais') {
    return HinosEspirituais.find((hymn) => hymn.number === hymnNumber);
  }

  if (hymnBook === 'corinhos-e-canticos-de-salvacao') {
    return CorinhosECanticosDeSalvacao.find((hymn) => hymn.number === hymnNumber);
  }

  return HinosECanticos.find((hymn) => hymn.number === hymnNumber);
}

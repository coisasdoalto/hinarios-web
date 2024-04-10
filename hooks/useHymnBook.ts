import CorinhosECanticosDeSalvacao from '../hymnsData/corinhos-e-canticos-de-salvacao/hymnBookInfo.json';
import HinosECanticos from '../hymnsData/hinos-e-canticos/hymnBookInfo.json';
import HinosEspirituais from '../hymnsData/hinos-espirituais/hymnBookInfo.json';
import { HymnBookSlug } from '../types/HymnBooks';

export function useHymnBook(hymnBookSlug: HymnBookSlug) {
  if (hymnBookSlug === 'hinos-espirituais') {
    return HinosEspirituais;
  }

  if (hymnBookSlug === 'corinhos-e-canticos-de-salvacao') {
    return CorinhosECanticosDeSalvacao;
  }

  return HinosECanticos;
}

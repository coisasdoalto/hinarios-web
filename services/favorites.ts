import axios from 'axios';

class FavoritesService {
  async add(hymnSlug: string) {
    return axios.patch('/api/favorites', {
      hymnSlug,
    });
  }

  async remove(hymnSlug: string) {
    return axios.delete('/api/favorites', {
      data: {
        hymnSlug,
      },
    });
  }

  async list() {
    const { data } = await axios.get<{ favorites: string[] }>('/api/favorites');

    return data;
  }
}

export const favoritesService = new FavoritesService();

import { schema } from 'typesaurus';
import { Bookmark } from '../../types/Bookmark';
import { User } from '../../types/User';

export const db = schema(($) => ({
  users: $.collection<User>().sub({
    bookmarks: $.collection<Bookmark>(),
  }),
}));

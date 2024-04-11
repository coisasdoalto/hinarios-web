import { schema } from 'typesaurus';

import { Bookmark } from '../../types/database/Bookmark';
import { User } from '../../types/database/User';

export const db = schema(($) => ({
  users: $.collection<User>().sub({
    bookmarks: $.collection<Bookmark>(),
  }),
}));

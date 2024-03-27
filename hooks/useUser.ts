import { User, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { auth } from '../firebase/web';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (!user || !authUser) return;

      // refresh when user changed to ease testing
      if (user.email !== authUser.email) {
        router.refresh();
      }
    });
  }, [user]);

  return user;
}

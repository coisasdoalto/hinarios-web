import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { firestore } from '../../../firebase';
import { authOptions } from '../auth/[...nextauth]';

import { FieldValue } from 'firebase-admin/firestore';

// TODO: uses fastify with fastify.server.emit
export default async function Handler(request: NextApiRequest, response: NextApiResponse) {
  if (!['GET', 'PATCH', 'DELETE'].includes(String(request.method))) {
    return response.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    return response.status(401).json({ message: 'Unauthorized' });
  }

  const usersCollection = firestore.collection('users');

  if (request.method === 'GET') {
    const user = await usersCollection.doc(session.user.id).get();

    if (!user) {
      return { favorites: [] };
    }

    return response.status(200).json({
      favorites: user.data()?.favorites,
    });
  }

  if (request.method === 'PATCH') {
    const { hymnSlug } = request.body;

    const user = await usersCollection.doc(session.user.id).get();

    if (!user) {
      const favorites = [hymnSlug];

      await usersCollection.doc(session.user.id).set({ favorites });

      return response.status(204).send('');
    }

    await usersCollection.doc(session.user.id).update({
      favorites: FieldValue.arrayUnion(hymnSlug),
    });

    return response.status(204).send('');
  }

  if (request.method === 'DELETE') {
    const { hymnSlug } = request.body;

    await usersCollection.doc(session.user.id).update({
      favorites: FieldValue.arrayRemove(hymnSlug),
    });

    return response.status(204).send('');
  }
}

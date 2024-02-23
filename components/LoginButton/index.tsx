import { ActionIcon, Avatar, Group } from '@mantine/core';
import { IconLogin, IconLogout } from '@tabler/icons';
import { signIn, signOut, useSession } from 'next-auth/react';

function LoginButton() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <ActionIcon
        variant="outline"
        onClick={() => signIn("google")}
        title="Fazer login"
      >
        <IconLogin size={18} />
      </ActionIcon>
    );
  }

  return (
    <Group>
      <ActionIcon
        variant="outline"
        onClick={() => signOut()}
        title="Sair"
      >
        <IconLogout size={18} />
      </ActionIcon>
      <Avatar src={session.user?.image} title={session.user?.name ?? "User"} alt={`Foto de ${session.user?.name}`} radius="xl">
        {session.user?.name ?? "User"}
      </Avatar>
    </Group>
  );
}

export default LoginButton;

import { ActionIcon, Avatar, Group } from '@mantine/core';
import { IconLogin, IconLogout } from '@tabler/icons';
import { signInWithGoogle, signOut } from '../../firebase/web/auth';
import { useUser } from '../../hooks/useUser';

function LoginButton() {
  const user = useUser();

  if (!user) {
    return (
      <ActionIcon variant="outline" onClick={() => signInWithGoogle()} title="Fazer login">
        <IconLogin size={18} />
      </ActionIcon>
    );
  }

  const userName = user.displayName ?? 'User';

  return (
    <Group>
      <ActionIcon variant="outline" onClick={() => signOut()} title="Sair">
        <IconLogout size={18} />
      </ActionIcon>
      <Avatar
        src={user.photoURL}
        size={28}
        title={userName}
        alt={`Foto de ${userName}`}
        radius="xl"
      >
        {userName}
      </Avatar>
    </Group>
  );
}

export default LoginButton;

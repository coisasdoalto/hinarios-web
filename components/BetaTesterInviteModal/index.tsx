import { FormEvent, useEffect, useState } from 'react';

import { Button, Modal, Text, TextInput, Title } from '@mantine/core';
import { useLocalStorage, useOs } from '@mantine/hooks';
import posthog from 'posthog-js';
import { supabase } from 'supabase';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email('Insira um e-mail válido'),
});

export function BetaTesterInviteModal() {
  const os = useOs();

  const [opened, setOpened] = useState(() => {
    const isInvited = localStorage.getItem('beta-tester-invited') == 'true';

    const isMobile = os === 'android' || os === 'ios';
    const isAndroid = os === 'android';

    if (isMobile && !isAndroid) return false;

    return !isInvited;
  });

  const setIsInvited = () => localStorage.setItem('beta-tester-invited', 'true');

  function handleClose() {
    setOpened(false);
    setIsInvited();
  }

  const [formError, setFormError] = useState('');

  async function submitHandler(event: FormEvent) {
    event.preventDefault();

    const form = document.forms.namedItem('betaTestForm')!;

    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const email = emailInput.value;

    const emailValidationResult = formSchema.safeParse({ email });

    if (!emailValidationResult.success) {
      setFormError(emailValidationResult.error.issues[0].message);
      return;
    }

    setFormError('');

    try {
      await supabase.from('beta_testers').insert({
        email,
      });
      posthog.capture('beta-tester-signed-up');
    } finally {
      setOpened(false);
      setIsInvited();
    }
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        title={<Title order={2}>Ajude-nos a disponibilizar este app na Play Store!</Title>}
        closeOnClickOutside={false}
        closeButtonLabel="Fechar"
        centered
      >
        <form name="betaTestForm" onSubmit={submitHandler}>
          <Text>
            Precisamos de 20 pessoas para instalar a versão de testes do app e usar durante 14 dias,
            antes de disponibilizar na loja publicamente. Caso seu celular seja Android e queira
            ajudar, insira seu e-mail aqui:
          </Text>
          <TextInput
            name="email"
            label="E-mail"
            placeholder="seu-email@exemplo.com"
            mt="md"
            error={formError}
          />
          <Button type="submit" mt="md" fullWidth>
            Enviar
          </Button>
        </form>
      </Modal>
    </>
  );
}

import { ActionIcon, Button, Flex, Loader, Modal, Overlay, Text, Title } from '@mantine/core';
import { IconDownload } from '@tabler/icons';
import { useCallback, useState } from 'react';

export function DownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadModalOpened, setIsDownloadModalOpened] = useState(false);

  const handleOpenDownloadModal = useCallback(() => setIsDownloadModalOpened(true), []);

  const handleDownloadHymns = useCallback(async () => {
    setIsDownloading(true);

    await window.workbox.messageSW({ type: 'DOWNLOAD_HYMNS' });

    setIsDownloading(false);
    setIsDownloadModalOpened(false);
  }, []);

  return (
    <ActionIcon
      variant="outline"
      title={isDownloading ? 'Baixando hinos' : 'Baixar hinos'}
      onClick={() => handleOpenDownloadModal()}
      disabled={isDownloading}
      sx={{
        position: 'relative',
      }}
    >
      <IconDownload size={14} />
      <Modal
        title={
          <Title>
            Deseja baixar os hinos?
          </Title>
        }
        opened={isDownloadModalOpened}
        onClose={() => setIsDownloadModalOpened(false)}
      >
        {isDownloading &&
          <Overlay color="#000" opacity={0.4} zIndex={5}>
            <Flex justify="center" align="center" h="100%">
              <Loader color="white" />
            </Flex>
          </Overlay>
        }
        <Text mb="md">
          Durante o download não será possível usar esse app. Deseja prosseguir?
        </Text>
        <Button onClick={() => handleDownloadHymns()} disabled={isDownloading}>
          Baixar!
        </Button>
      </Modal>
    </ActionIcon>
  );
}

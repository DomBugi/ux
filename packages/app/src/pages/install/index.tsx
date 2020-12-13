import React, { useState, useCallback } from 'react';
import { Box, Flex, Text, Button } from '@stacks/ui';
import { useWallet } from '@common/hooks/use-wallet';
import { useAnalytics } from '@common/hooks/use-analytics';
import { ScreenPaths } from '@store/onboarding/types';
import { ConnectIcon } from '@components/icons/connect-icon';
import { InstallFinished } from '@pages/install/finished';
import { Link } from '@components/link';

export const Installed: React.FC = () => {
  const { isSignedIn, doMakeWallet } = useWallet();
  const { doChangeScreen } = useAnalytics();

  const [isCreatingWallet, setIsCreatingWallet] = useState(false);

  const register = useCallback(() => {
    setIsCreatingWallet(true);
    doMakeWallet();
  }, [doMakeWallet]);

  if (isSignedIn) {
    return <InstallFinished />;
  }

  return (
    <Flex wrap="wrap" py={5} px={4} flexDirection="column" minHeight="100vh">
      <Flex justifyContent="space-between" alignItems="center" mb={[null, '6vh', '12vh']}>
        <Box
          _hover={{ cursor: 'pointer' }}
          onClick={() => void doChangeScreen(ScreenPaths.INSTALLED)}
        >
          <ConnectIcon />
        </Box>
        <Box />
      </Flex>
      <Flex flex={1} justifyContent={[null, 'center']}>
        <Flex
          flexDirection="column"
          pb="120px"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
        >
          <Box>
            <Text fontSize="32px" lineHeight="48px" fontWeight="500">
              Connect is installed
            </Text>
          </Box>
          <Box>
            <Text fontSize="base" lineHeight="48px" color="ink.600">
              Are you new or do you already have a Secret Key?
            </Text>
          </Box>
          <Flex
            flexDirection="column"
            mt={[null, 'base-loose']}
            maxWidth={[null, '396px']}
            minWidth={[null, '396px']}
          >
            <Button onClick={register} isLoading={isCreatingWallet} data-test="sign-up">
              I'm new to Connect
            </Button>
          </Flex>
          <Box pt="base-loose">
            <Text fontSize="14px" lineHeight="20px" color="blue" position="relative">
              <Link onClick={() => doChangeScreen(ScreenPaths.SIGN_IN_INSTALLED)}>
                Continue with Secret Key
              </Link>
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

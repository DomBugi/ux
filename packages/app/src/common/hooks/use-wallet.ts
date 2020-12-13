import { useCallback } from 'react';
import { decrypt, Wallet, makeIdentity } from '@stacks/keychain';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useDispatch } from 'react-redux';
import { gaiaUrl } from '@common/constants';
import { bip32 } from 'bitcoinjs-lib';
import { currentNetworkKeyStore, currentNetworkStore, networksStore } from '@store/recoil/networks';
import {
  walletStore,
  currentIdentityIndexStore,
  currentIdentityStore,
  encryptedSecretKeyStore,
  secretKeyStore,
  hasSetPasswordStore,
} from '@store/recoil/wallet';

import { ChainID } from '@blockstack/stacks-transactions';
import { DEFAULT_PASSWORD, ScreenPaths } from '@store/onboarding/types';
import { mnemonicToSeed } from 'bip39';
import { useOnboardingState } from './use-onboarding-state';
import { finalizeAuthResponse } from '@common/utils';
import {
  doSetOnboardingPath,
  doSetOnboardingProgress,
  doChangeScreen,
  saveAuthRequest,
} from '@store/onboarding/actions';
import { doTrackScreenChange } from '@common/track';
import { AppManifest, DecodedAuthRequest } from '@common/dev/types';
import { decodeToken } from 'blockstack';

const loadManifest = async (decodedAuthRequest: DecodedAuthRequest) => {
  const res = await fetch(decodedAuthRequest.manifest_uri);
  const json: AppManifest = await res.json();
  return json;
};

export const useWallet = () => {
  const [wallet, setWallet] = useRecoilState(walletStore);
  const [secretKey, setSecretKey] = useRecoilState(secretKeyStore);
  const [encryptedSecretKey, setEncryptedSecretKey] = useRecoilState(encryptedSecretKeyStore);
  const [currentIdentityIndex, setCurrentIdentityIndex] = useRecoilState(currentIdentityIndexStore);
  const [hasSetPassword, setHasSetPassword] = useRecoilState(hasSetPasswordStore); // 🧐 setHasSetPassword 🤮
  const currentIdentity = useRecoilValue(currentIdentityStore);
  const networks = useRecoilValue(networksStore);
  const currentNetwork = useRecoilValue(currentNetworkStore);
  const currentNetworkKey = useRecoilValue(currentNetworkKeyStore);
  const dispatch = useDispatch();
  const { decodedAuthRequest, authRequest, appName, appIcon, screen } = useOnboardingState();

  const identities = wallet?.identities;
  const firstIdentity = identities?.[0];
  const isSignedIn = !!wallet;

  const doMakeWallet = useCallback(async () => {
    const wallet = await Wallet.generate(DEFAULT_PASSWORD, ChainID.Mainnet);
    const secretKey = await decrypt(wallet.encryptedBackupPhrase, DEFAULT_PASSWORD);
    setWallet(wallet);
    setSecretKey(secretKey);
    setEncryptedSecretKey(wallet.encryptedBackupPhrase);
    setCurrentIdentityIndex(0);
  }, [setWallet, setSecretKey, setEncryptedSecretKey, setCurrentIdentityIndex]);

  const doStoreSeed = useCallback(
    async (secretKey: string) => {
      const wallet = await Wallet.restore(DEFAULT_PASSWORD, secretKey, ChainID.Mainnet);
      setWallet(wallet);
      setSecretKey(secretKey);
      setEncryptedSecretKey(wallet.encryptedBackupPhrase);
      setCurrentIdentityIndex(0);
    },
    [setWallet, setSecretKey, setEncryptedSecretKey, setCurrentIdentityIndex]
  );

  const doCreateNewIdentity = useCallback(async () => {
    if (!secretKey || !wallet) {
      throw 'Unable to create a new identity - not logged in.';
    }
    const seed = await mnemonicToSeed(secretKey);
    const rootNode = bip32.fromSeed(seed);
    const index = wallet.identities.length;
    const identity = await makeIdentity(rootNode, index);
    wallet.identities.push(identity);
    setWallet(wallet);
    setCurrentIdentityIndex(index);
  }, [wallet, secretKey, setCurrentIdentityIndex, setWallet]);

  const doSignOut = useCallback(() => {
    setWallet(undefined);
    setCurrentIdentityIndex(undefined);
    setSecretKey(undefined);
    setEncryptedSecretKey(undefined);
    setHasSetPassword(false);
  }, [setWallet, setCurrentIdentityIndex, setSecretKey, setEncryptedSecretKey, setHasSetPassword]);

  const doFinishSignIn = useCallback(
    async (identityIndex: number) => {
      if (!decodedAuthRequest || !authRequest || !identities || !wallet) {
        console.error('Uh oh! Finished onboarding without auth info.');
        return;
      }
      const appURL = new URL(decodedAuthRequest.redirect_uri);
      const currentIdentity = identities[identityIndex];
      await currentIdentity.refresh();
      const gaiaConfig = await wallet.createGaiaConfig(gaiaUrl);
      await wallet.getOrCreateConfig({ gaiaConfig, skipUpload: true });
      await wallet.updateConfigWithAuth({
        identityIndex,
        gaiaConfig,
        app: {
          origin: appURL.origin,
          lastLoginAt: new Date().getTime(),
          scopes: decodedAuthRequest.scopes,
          appIcon: appIcon as string,
          name: appName as string,
        },
      });
      const authResponse = await currentIdentity.makeAuthResponse({
        gaiaUrl,
        appDomain: appURL.origin,
        transitPublicKey: decodedAuthRequest.public_keys[0],
        scopes: decodedAuthRequest.scopes,
      });
      finalizeAuthResponse({ decodedAuthRequest, authRequest, authResponse });
      setWallet(wallet);
      dispatch(doSetOnboardingPath(undefined));
      dispatch(doSetOnboardingProgress(false));
    },
    [appIcon, appName, dispatch, wallet, decodedAuthRequest, authRequest, identities, setWallet]
  );

  const doSaveAuthRequest = useCallback(
    async (authRequest: string) => {
      const { payload } = decodeToken(authRequest);
      const decodedAuthRequest = (payload as unknown) as DecodedAuthRequest;
      let appName = decodedAuthRequest.appDetails?.name;
      let appIcon = decodedAuthRequest.appDetails?.icon;

      if (!appName || !appIcon) {
        const appManifest = await loadManifest(decodedAuthRequest);
        appName = appManifest.name;
        appIcon = appManifest.icons[0].src as string;
      }

      const hasIdentities = identities && identities.length;
      if ((screen === ScreenPaths.GENERATION || screen === ScreenPaths.SIGN_IN) && hasIdentities) {
        doTrackScreenChange(ScreenPaths.CHOOSE_ACCOUNT, decodedAuthRequest);
        dispatch(doChangeScreen(ScreenPaths.CHOOSE_ACCOUNT));
      } else {
        doTrackScreenChange(screen, decodedAuthRequest);
      }

      dispatch(
        saveAuthRequest({
          decodedAuthRequest,
          authRequest,
          appName,
          appIcon,
          appURL: new URL(decodedAuthRequest.redirect_uri),
        })
      );
    },
    [dispatch, identities, screen]
  );

  return {
    identities,
    firstIdentity,
    wallet,
    secretKey,
    isSignedIn,
    currentIdentity,
    currentIdentityIndex,
    networks,
    currentNetwork,
    currentNetworkKey,
    encryptedSecretKey,
    hasSetPassword,
    doMakeWallet,
    doStoreSeed,
    doCreateNewIdentity,
    doSignOut,
    doFinishSignIn,
    doSaveAuthRequest,
    setWallet,
  };
};

/* eslint no-throw-literal: "off" */
import { NetworkLayer } from 'app/utils';
import { Settings } from 'app/config';
import * as Expo from 'expo';

export default class GoogleAuth {
  static googleLogin = async (loadingWheel, onSuccess) => {
    const { isAndroid, buildType } = Settings;
    try {
      const result = await Expo.Google.logInAsync({
        webClientId: Settings.google[Settings.buildType].webClientId,
        clientId: isAndroid
          ? Settings.google[Settings.buildType].webClientId
          : Settings.google[buildType].iosClientId,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        NetworkLayer.fetchAccessTokenFromCredentials(result.user.id, result.idToken, 'google').then(() => {
          // Stop loading wheel
          if (loadingWheel.stopLoading && typeof loadingWheel.stopLoading === 'function') {
            loadingWheel.stopLoading();
          }

          // Action to execute on success login
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess();
          }
        });
      } else if (result.type === 'cancel') {
        throw {
          code: 1000,
          message: 'Google login cancelled.',
        };
      }
    } catch (e) {
      // Stop loading wheel
      if (loadingWheel.stopLoading && typeof loadingWheel.stopLoading === 'function') {
        loadingWheel.stopLoading();
      }
    }
  }
}

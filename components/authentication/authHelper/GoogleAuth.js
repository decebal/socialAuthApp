import * as Expo from 'expo';
import Settings from '../../../constants/Settings'
import NetworkLayer from '../../../api/NetworkLayer'


export default class GoogleAuth {
  static googleLogin = async (onSuccess) => {
    const { isAndroid, buildType, google } = Settings;
    try {
      const result = await Expo.Google.logInAsync({
        webClientId: google[buildType].webClientId,
        clientId: isAndroid
          ? google[buildType].webClientId
          : google[buildType].iosClientId,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        NetworkLayer.fetchAccessTokenFromCredentials(result.user.id, result.idToken, 'google').then(() => {
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

    }
  }
}

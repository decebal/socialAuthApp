import * as Expo from 'expo';
import Settings from '../../../constants/Settings'
import NetworkLayer from '../../../api/NetworkLayer'

export default class FacebookAuth {
  /**
  * Handle the facebook login
  *
  * @param  {function} onSuccess  Action to apply on login success
  */
  static facebookLogin = async (onSuccess) => {
    const { isAndroid, buildType, facebook } = Settings;
    try {
      const {
        type,
        token,
      } = await Expo.Facebook.logInWithReadPermissionsAsync(facebook[buildType], {
        permissions: ['public_profile'],
      });

      if (type === 'success') {
        // Get the user's information from Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const fbData = (await response.json());
        const userId = fbData.id;
        const userData = {
          name: {
            givenName: fbData.name.givenName,
            familyName: fbData.name.familyName,
          },
          email: fbData.email,
        };

        NetworkLayer.fetchAccessTokenFromCredentials({ publicId: userId, provider: 'facebook', userData }).then(() => {
          // Action to execute on success login
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess();
          }
        });
      } else if (type === 'cancel') {
        throw {
          code: 1000,
          message: 'Facebook login cancelled.',
        };
      }
    } catch (e) {
      // do something useful such as e.g. Stop loading wheel
    }
  }
}

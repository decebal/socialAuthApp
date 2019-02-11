/* eslint no-throw-literal: "off" */
/* eslint no-undef: "off" */
import { NetworkLayer } from 'app/utils';
import * as Expo from 'expo';
import { Settings } from 'app/config';

export default class FacebookAuth {
  /**
  * Handle the facebook login
  *
  * @param  {object} loadingWheel  loadingWheel reference
  * @param  {function} onSuccess  Action to apply on login success
  */
  static facebookLogin = async (loadingWheel, onSuccess) => {
    try {
      const {
        type,
        token,
      } = await Expo.Facebook.logInWithReadPermissionsAsync(Settings.facebook.apid, {
        permissions: ['public_profile'],
      });

      if (type === 'success') {
        // Get the user's information from Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const userId = (await response.json()).id;

        NetworkLayer.fetchAccessTokenFromCredentials(userId, token, 'facebook').then(() => {
          // Stop loading wheel
          if (loadingWheel.stopLoading && typeof loadingWheel.stopLoading === 'function') {
            loadingWheel.stopLoading();
          }

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
      // Stop loading wheel
      if (loadingWheel.stopLoading && typeof loadingWheel.stopLoading === 'function') {
        loadingWheel.stopLoading();
      }
    }
  }
}

import { DeviceEventEmitter } from 'react-native';
import Uuid from 'react-native-uuid';
import Settings from '../constants/Settings'


export default class NetworkLayer {
  static sessionStart() {
    DeviceEventEmitter.emit('sessionStart');
    return true;
  }

  static fetchAccessTokenFromCredentials(publicId, secret, provider) {
    return new Promise((resolve, reject) => {
      fetch(Settings.uris.token, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Client-Request-Id': Uuid.v4().trim(),
        },
        body: JSON.stringify({
          // grant_type: 'user_credentials',
          // client_id: '',
          // public_id: publicId,
          // secret,
          // provider,
        }),
      }).then((response) => {
        if (response.status !== 200) {
          throw {};
        }

        return response.json();
      }).then((response) => {
        const auth = {
          accessToken: response.access_token,
          id: response.id,
          expireDate: new Date().setSeconds(response.expires_in),
        };

        // Save auth to Store

        return auth;
      }).then(() => NetworkLayer.sessionStart())
        .then((sessionStarted) => {
          resolve(sessionStarted);
        })
        .catch((exception) => {
          reject(exception);
        });
    });
  }
}

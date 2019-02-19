import { Platform } from 'react-native';
import {
  GOOGLE_PRODUCTION_WEB,
  GOOGLE_PRODUCTION_IOS,
  GOOGLE_DEV_WEB,
  GOOGLE_DEV_IOS,
  FACEBOOK_PRODUCTION,
  FACEBOOK_DEV,
  BASE_IDENTITY_API
} from 'react-native-dotenv';

const Settings = {
  google: {
    production: {
      webClientId: GOOGLE_PRODUCTION_WEB,
      iosClientId: GOOGLE_PRODUCTION_IOS,
    },
    development: {
      webClientId: GOOGLE_DEV_WEB,
      iosClientId: GOOGLE_DEV_IOS,
    },
  },
  facebook: {
    production: FACEBOOK_PRODUCTION,
    development: FACEBOOK_DEV,
  },
  isAndroid: Platform.OS === 'android',
  buildType: (!__DEV__) ? 'production' : 'development',
  uris: {
    token: `${BASE_IDENTITY_API}/token`
  }
}

export default Settings;

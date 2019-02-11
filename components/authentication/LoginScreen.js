/* eslint global-require: "off" */
/* react/no-string-refs: "off" */
import React, { Component } from 'react';
import {
  View, Text, ImageBackground, StatusBar,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { ScaledSheet } from 'react-native-size-matters';
import I18n from 'app/localisation/I18n';
import { Styles } from 'app/config';
import LoginContainer from 'app/common/components/LoginContainer';
import FullLoadingWheel from 'app/common/components/FullLoadingWheel';

const styles = ScaledSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
  },
  logoContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '23@ms',
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    lineHeight: 28,
  },
  loadingWheel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Styles.colours.neutralPrimary,
  },
});

export default class LoginScreen extends Component {
  // Remove NavBar
  static navigationOptions = {
    header: null,
  };

  handleSuccessLogin = () => {
    const { navigation } = this.props;

    navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName: 'DrawerStack',
      })],
    }));
  };

  render() {
    return (
      <FullLoadingWheel
        ref={(ref) => { this.loadingWheel = ref; }}
        initialLoadingState={false}
        style={styles.loadingWheel}
      >
        <StatusBar barStyle="light-content" />
        <ImageBackground source={require('app/assets/candle_background.png')} style={styles.imageBackground}>
          <View style={styles.logoContainer}>
            <Text style={styles.title}>
              {I18n.t('loginScreen.title', { defaultValue: 'Light a candle/n for your loved one' })}
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <LoginContainer
              self={this}
              onLoginSuccess={this.handleSuccessLogin}
            />
          </View>
        </ImageBackground>
      </FullLoadingWheel>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
};

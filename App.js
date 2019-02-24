import React, { Component } from 'react';
import { ScrollView, View, StatusBar, RefreshControl, KeyboardAvoidingView } from 'react-native';
import WebviewSite from './src/mobile/components/WebviewSite/WebviewSite';
import { AdMobBanner, AdMobInterstitial } from 'expo';

const { ad: { showBanner, showInterstitial, test, production } } = require('./config/variables');
const { banner, interstitial } = production;

const BannerAd = ({ }) => showBanner ? <AdMobBanner
  style={{ position: "absolute", bottom: 0 }}
  bannerSize="smartBannerPortrait"
  adUnitID={banner}
  testDeviceID="EMULATOR"
  onDidFailToReceiveAdWithError={() => console.log('error from ad')} /> : null;

export default class App extends Component {
  render() {
    return <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar barStyle="light-content" />
      <WebviewSite />
    </View>;
  }
}
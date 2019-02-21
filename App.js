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
  state = {
    refreshing: false,
  }

  async showAds() {
    if (!showInterstitial) return;
    AdMobInterstitial.setAdUnitID(interstitial);
    AdMobInterstitial.setTestDeviceID("EMULATOR");
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  }

  _onRefresh = () => {
    // setTimeout(this.showAds, 0);
    this.setState({ refreshing: true });
    this.setState({ refreshing: false });
  }

  getRefreshControl() {
    return null;
    return <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} title={'Loading'} />;
  }

  render() {
    return <ScrollView
      contentContainerStyle={{ flex: 1, paddingTop: 30, backgroundColor: '#000000' }}
      scrollEnabled={true}
      bounces={false}
      refreshControl={this.getRefreshControl()}>
      <StatusBar barStyle="light-content" />
      <WebviewSite refresh={this.state.refreshing} marginBottom={showBanner ? 44 : 0} />
      <BannerAd />
    </ScrollView>;
  }
}
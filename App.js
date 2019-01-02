import React, { Component } from 'react';
import { ScrollView, View, StatusBar, RefreshControl } from 'react-native';
import WebviewSite from './src/mobile/components/WebviewSite/WebviewSite';
import { AdMobBanner, AdMobInterstitial } from 'expo';

const { ad: { showBanner, showInterstitial, test, prod } } = require('./config/variables');
const { banner, interstitial } = prod;

const BannerAd = ({ }) => <AdMobBanner
  style={{ position: "absolute", bottom: 0 }}
  bannerSize="smartBannerPortrait"
  adUnitID={banner}
  testDeviceID="EMULATOR"
  onDidFailToReceiveAdWithError={() => console.log('error from ad')} />;

export default class App extends Component {
  state = {
    refreshing: false,
  }
  componentDidMount() {
    if (showInterstitial) {
      AdMobInterstitial.setAdUnitID(interstitial);
      AdMobInterstitial.setTestDeviceID("EMULATOR");
    }
  }
  async showAds() {
    if(!showInterstitial) return;
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  }
  _onRefresh = () => {
    setTimeout(this.showAds, 100);
    this.setState({ refreshing: true });
    this.setState({ refreshing: false });
  }
  render() {
    return <ScrollView
      contentContainerStyle={{ flex: 1, paddingTop: 30, backgroundColor: this.state.refreshing ? '#ffffff' : '#000000' }}
      refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} title={'Loading'} />}>
      <StatusBar barStyle="light-content" />
      <WebviewSite refresh={this.state.refreshing} />
      {showBanner && <BannerAd />}
    </ScrollView>;
  }
}
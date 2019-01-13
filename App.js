import React, { Component } from 'react';
import { ScrollView, View, StatusBar, RefreshControl } from 'react-native';
import WebviewSite from './src/mobile/components/WebviewSite/WebviewSite';
import { AdMobBanner, AdMobInterstitial } from 'expo';

const { ad: { showBanner, showInterstitial, test, production } } = require('./config/variables');
const { banner, interstitial } = production;

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
    setTimeout(this.showAds, 0);
    this.setState({ refreshing: true });
    this.setState({ refreshing: false });
  }
  render() {
    return <ScrollView
      contentContainerStyle={{ flex: 1, paddingTop: 30, backgroundColor: '#000000' }}
      scrollEnabled={false}
      refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} title={'Loading'} />}>
      <StatusBar barStyle="light-content" />
      <WebviewSite refresh={this.state.refreshing} marginBottom={showBanner ? 44 : 0}/>
      {showBanner && <BannerAd />}
    </ScrollView>;
  }
}
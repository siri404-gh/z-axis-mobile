import React, { Component } from 'react';
import { ScrollView, View, StatusBar, RefreshControl } from 'react-native';
import WebviewSite from './src/mobile/components/WebviewSite/WebviewSite';
import { AdMobBanner, AdMobInterstitial } from 'expo';
import { Ionicons } from '@expo/vector-icons';

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
    if (!showInterstitial) return;
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  }
  _onRefresh = () => {
    setTimeout(this.showAds, 100);
    this.setState({ refreshing: true });
    this.setState({ refreshing: false });
  }
  getRefresh() {
    return <View
    style={{
      zIndex: 10000,
      position: 'absolute',
      top: 80,
      right: 40,
    }}
    onPress={this._onRefresh}
    ><Ionicons
    onPress={this._onRefresh}
      name="md-refresh"
      size={32}
      color="black"
    /></View>;
  }
  render() {
    return <ScrollView
      contentContainerStyle={{ flex: 1, paddingTop: 30, backgroundColor: this.state.refreshing ? '#ffffff' : '#000000' }}
      refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} title={'Loading'} />}>
      <StatusBar barStyle="light-content" />
      {/* {this.getRefresh()} */}
      <WebviewSite refresh={this.state.refreshing} />
      {showBanner && <BannerAd />}
    </ScrollView>;
  }
}
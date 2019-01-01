import React, { Component } from 'react';
import { ScrollView, View, StatusBar, RefreshControl } from 'react-native';
import WebviewSite from './src/mobile/components/WebviewSite/WebviewSite';


import {
  AdMobBanner,
  AdMobInterstitial,
} from 'expo';


// Test ads
// let bannerPubID = "ca-app-pub-3940256099942544/2934735716";
// let interstitialPubID = "ca-app-pub-3940256099942544/4411468910";

// My ads
let bannerPubID = "ca-app-pub-6831276331714408/9053954679";
// let interstitialPubID = "ca-app-pub-6831276331714408/1135882305";

const pubID = bannerPubID;

const BannerAd = ({ }) => <AdMobBanner
  style={{ position: "absolute", bottom: 0 }}
  bannerSize="smartBannerPortrait"
  adUnitID={pubID}
  testDeviceID="EMULATOR"
  onDidFailToReceiveAdWithError={() => console.log('error from ad')} />;

export default class App extends Component {
  state = {
    refreshing: false,
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.setState({ refreshing: false });
  }
  render() {
    return <ScrollView
      contentContainerStyle={{ flex: 1, paddingTop: 30, backgroundColor: this.state.refreshing ? '#ffffff' : '#000000' }}
      refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} title={'Loading'} />}>
      <StatusBar barStyle="light-content" />
      <WebviewSite refresh={this.state.refreshing} />
      <BannerAd />
    </ScrollView>;
  }
}
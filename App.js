import React, { Component } from 'react';
import { WebView, View, Text } from 'react-native';

import {
  AdMobBanner,
  AdMobInterstitial,
} from 'expo';

// Test ads
// let bannerPubID = "ca-app-pub-3940256099942544/2934735716";
// let interstitialPubID = "ca-app-pub-3940256099942544/4411468910";

// My ads
// let bannerPubID = "ca-app-pub-6831276331714408/9053954679";
let interstitialPubID = "ca-app-pub-6831276331714408/1135882305";

const pubID = interstitialPubID;

// const BannerAd = ({ }) => <AdMobBanner
//   style={{ position: "absolute", top: 0 }}
//   adUnitID={pubID}
//   testDeviceID="EMULATOR"
//   onDidFailToReceiveAdWithError={() => console.log('error from ad')} />;

class WebviewSite extends Component {
  componentDidMount() {
    AdMobInterstitial.setAdUnitID(pubID);
    AdMobInterstitial.setTestDeviceID("EMULATOR");
  }
  async showAds() {
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  }     
  render() {
    return <WebView
      ref={'webview'}
      userAgent={"londonz"}
      onLoadStart={() => setTimeout(this.showAds, 1*60*1000)}
      startInLoadingState={true}
      bounce={false}
      source={{ uri: 'https://test.londonz.app' }}
      style={{ marginTop: 20, flex: 1, height: '100%' }} />;
  }
}

export default class App extends Component {
  render() {
    return <WebviewSite />;
  }
}

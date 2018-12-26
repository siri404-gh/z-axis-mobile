import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import WebviewSite from './src/mobile/components/WebviewSite/WebviewSite';

// const BannerAd = ({ }) => <AdMobBanner
//   style={{ position: "absolute", top: 0 }}
//   adUnitID={pubID}
//   testDeviceID="EMULATOR"
//   onDidFailToReceiveAdWithError={() => console.log('error from ad')} />;

export default class App extends Component {
  render() {
    return <View style={{ flex: 1, paddingTop: 20, backgroundColor: '#000000' }}>
      <StatusBar barStyle="light-content" />
      <WebviewSite />
    </View>;
  }
}
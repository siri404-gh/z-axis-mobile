import React, { Component } from 'react';
import { ScrollView, View, StatusBar, RefreshControl } from 'react-native';
import WebviewSite from './src/mobile/components/WebviewSite/WebviewSite';

// const BannerAd = ({ }) => <AdMobBanner
//   style={{ position: "absolute", top: 0 }}
//   adUnitID={pubID}
//   testDeviceID="EMULATOR"
//   onDidFailToReceiveAdWithError={() => console.log('error from ad')} />;

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
    </ScrollView>;
  }
}
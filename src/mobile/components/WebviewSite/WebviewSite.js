import React, { Component } from 'react';
import { WebView } from 'react-native';
import { registerForPushNotificationsAsync } from './push';

// import {
//   AdMobBanner,
//   AdMobInterstitial,
// } from 'expo';

// Test ads
// let bannerPubID = "ca-app-pub-3940256099942544/2934735716";
// let interstitialPubID = "ca-app-pub-3940256099942544/4411468910";

// My ads
// let bannerPubID = "ca-app-pub-6831276331714408/9053954679";
// let interstitialPubID = "ca-app-pub-6831276331714408/1135882305";

// const pubID = interstitialPubID;

class WebviewSite extends Component {
    // componentDidMount() {
    //   AdMobInterstitial.setAdUnitID(pubID);
    //   AdMobInterstitial.setTestDeviceID("EMULATOR");
    // }
    // async showAds() {
    //   await AdMobInterstitial.requestAdAsync();
    //   await AdMobInterstitial.showAdAsync();
    // }
    state = {
        token: '',
    }
    componentDidMount() {
        registerForPushNotificationsAsync()
            .then(d => {
                this.setState({ token: d });
            })
            .catch(e => console.log('error', e));
    }
    render() {
        return <WebView
            ref={'webview'}
            userAgent={"londonz"}
            // onLoadStart={() => setTimeout(this.showAds, 1*60*1000)}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            injectedJavaScript={`window.token='${this.state.token}'`}
            startInLoadingState={false}
            scrollEnabled={false}
            bounce={false}
            useWebKit={true}
            source={{ uri: 'https://test.londonz.app' }}
            style={{ flex: 1, height: '100%' }} />;
    }
}

export default WebviewSite;
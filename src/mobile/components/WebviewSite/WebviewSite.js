import React, { Component } from 'react';
import { View, WebView, ActivityIndicator } from 'react-native';
import { registerForPushNotificationsAsync } from './push';

const url = 'https://test.londonz.app'

export default class App extends Component {
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

  renderLoading() {
    return <ActivityIndicator style={{ height: '100%', backgroundColor: '#000000' }} size="large" color="#0000ff" hidesWhenStopped={false} />;
  }

  render() {
    return (
      <WebView
        ref={n => this.WebViewRef = n}
        userAgent={"Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36"}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={`window.token='${this.state.token}'`}
        startInLoadingState={true}
        scrollEnabled={true}
        renderLoading={this.renderLoading}
        bounce={false}
        useWebKit={true}
        source={{ uri: url }}
        style={{ height: '100%', marginTop: 30, backgroundColor: '#ffffff' }} />
    );
  }
}
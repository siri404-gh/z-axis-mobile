import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { registerForPushNotificationsAsync } from './push';

const url = 'https://test.londonz.app'

class Londonz extends Component {
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
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.refresh === false) this.WebViewRef.reload();
  }
  renderLoading() {
    return null;
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
        renderLoading={this.renderLoading}
        scrollEnabled={true}
        bounce={false}
        useWebKit={true}
        source={{ uri: url }}
        style={{ height: '100%', marginBottom: this.props.marginBottom }} />
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoaded: false,
    }
  }

  render() {
    if (this.state.isLoaded) {
      return <Londonz />
    }
    return (
      <View style={[styles.container, styles.horizontal]}>
        <View style={{ height: 0, width: 0, padding: 0 }}>
          <WebView
            source={{ uri: url }}
            onLoad={() => this.setState({ isLoaded: true })} />
        </View>
          <ActivityIndicator size="large" color="#00ff00" hidesWhenStopped={false} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    background: '#000000',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    background: '#000000',
  }
})
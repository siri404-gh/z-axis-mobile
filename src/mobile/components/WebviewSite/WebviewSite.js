import React, { Component } from 'react';
import { WebView } from 'react-native';
import { registerForPushNotificationsAsync } from './push';

class WebviewSite extends Component {
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
      if(nextProps && nextProps.refresh === false) this.WebViewRef.reload();
    }
    renderLoading() {
      return null;
    }
    render() {
        return <WebView
          ref={n => this.WebViewRef = n}
          userAgent={"londonz"}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          injectedJavaScript={`window.token='${this.state.token}'`}
          startInLoadingState={true}
          renderLoading={this.renderLoading}
          scrollEnabled={true}
          bounce={false}
          useWebKit={true}
          source={{ uri: 'https://test.londonz.app' }}
          style={{ height: '100%', marginBottom: this.props.marginBottom }} />;
    }
}

export default WebviewSite;
import React from 'react';
import { WebView } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <WebView
        source={{ uri: 'https://www.londonz.app' }}
        style={{ marginTop: 20 }} />
    );
  }
}

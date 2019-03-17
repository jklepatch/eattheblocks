import React, { Component } from 'react';
import { DrizzleProvider } from 'drizzle-react';
import { LoadingContainer } from 'drizzle-react-components';
import drizzleOptions from './drizzleOptions';
import MyComponent from './MyComponent';

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <LoadingContainer>
          <MyComponent />
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}

export default App;

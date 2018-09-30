import React from 'react';
import { DrizzleContext } from "drizzle-react";
import Container from './Container'

const App = () => (
  <DrizzleContext.Consumer>
    {context => {
      window.driz = context
      return context.initialized
        ? <Container drizzleContext={context} />
        : <div>loading...</div>
    }}
  </DrizzleContext.Consumer>
)

export default App;
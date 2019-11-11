import React from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';

function withBlockchain(Component) {
  return props =>  (
    <DrizzleContext.Consumer>
      {blockchainProps => (
        <Component {...props} {...blockchainProps}  />
      )}
    </DrizzleContext.Consumer>
  );
}
export default withBlockchain;


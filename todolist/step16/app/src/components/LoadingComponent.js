import React from 'react';
import withDrizzle from './DrizzleContainer';

const LoadingComponent = ({initialized, children}) => {
  if(initialized === false) {
    return 'Loading...';
  }
  return <div>{children}</div>;
};

export default withDrizzle(LoadingComponent);

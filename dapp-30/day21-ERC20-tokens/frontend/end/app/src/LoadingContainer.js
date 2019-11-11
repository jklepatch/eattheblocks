import React from 'react';
import withBlockchain from './withBlockchain.js';

function LoadingContainer({initialized, children}) {
  if(!initialized) return <div>Loading...</div>;
  return (
    <>
      {children}
    </>
  );
}


export default withBlockchain(LoadingContainer);

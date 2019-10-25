import React from 'react';
import dynamic from 'next/dynamic';

const MSALLoginDynamic = dynamic(
  () => import('../components/MSALLogin'),
  {
    ssr: false,
  }
);
//
// const MSALDynamic = () => <MSALLoginDynamic />;
//
// export default MSALDynamic;

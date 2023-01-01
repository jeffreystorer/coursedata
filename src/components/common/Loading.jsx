import React, { useEffect } from 'react';
import SpinnerFavicon from 'spinner-favicon';
//import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Spinner from '@/assets/Spinner.gif';

export default function Loading() {
  const imgStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  useEffect(() => {
    SpinnerFavicon.start();
    return () => {
      SpinnerFavicon.stop();
    };
  });

  return <img src={Spinner} alt='' style={imgStyle} />;
}

// pages/_document.tsx

import { Html, Head, Main, NextScript } from 'next/document';
import { GoogleTagManagerHead, GoogleTagManagerBody } from '../components/GoogleTagManager';

function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <GoogleTagManagerBody />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
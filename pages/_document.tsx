// pages/_document.tsx

import { Html, Head, Main, NextScript } from 'next/document';
import { GoogleTagManagerHead, GoogleTagManagerBody } from '../components/GoogleTagManager';

function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>
      <body>
        <GoogleTagManagerBody />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
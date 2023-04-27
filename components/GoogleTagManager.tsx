// components/GoogleTagManager.tsx

import React from 'react';
import Script from 'next/script';

const GTM_ID = 'GTM-5XNMQVM';

const GoogleTagManagerHead = () => {
    return (
        <Script
        id="gtm-script"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        onLoad={() => {
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        }}
        />
    );
    };

    const GoogleTagManagerBody = () => {
    return (
        <noscript
        dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
        />
    );
};

export { GoogleTagManagerHead, GoogleTagManagerBody };

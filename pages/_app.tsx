import '@/styles/globals.css'
import { Inter } from "@next/font/google";
import type { AppProps } from 'next/app'
import { GoogleTagManagerHead } from '../components/GoogleTagManager';

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps<{}>) {
  return (
    <main className={inter.className}>
      <GoogleTagManagerHead />
      <Component {...pageProps} />
    </main>
  );
}

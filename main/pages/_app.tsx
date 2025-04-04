import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (window.location.pathname !== "/") {
      router.replace(window.location.pathname);
    }
  }, []);

  return <Component {...pageProps} />
}

import '@/styles/globals.css';
import type { AppProps, AppContext, AppInitialProps } from 'next/app';
import { createContext, useEffect, useMemo, useRef } from 'react';
import App from 'next/app';
import Link from 'next/link';

export const NonceContext = createContext<string | undefined>(undefined);

type Props = { nonce?: string };

export default function MyApp({
  Component,
  pageProps,
  nonce,
}: Props & AppProps) {
  const nonceRef = useRef(nonce);

  useEffect(() => {
    if (nonce) {
      nonceRef.current = nonce;
    }
  }, [nonce]);

  return (
    <NonceContext.Provider value={nonceRef.current}>
      <div>
        <h1>
          My nonce is <code>{nonceRef.current}</code>
        </h1>
        <ul>
          <li>
            <Link className="text-sky-600 underline" href="/">
              Index
            </Link>
          </li>
          <li>
            <Link className="text-sky-600 underline" href="/page1">
              Page 1
            </Link>
          </li>
          <li>
            <Link className="text-sky-600 underline" href="/page2">
              Page 2
            </Link>
          </li>
        </ul>
        <Component {...pageProps} />
      </div>
    </NonceContext.Provider>
  );
}

MyApp.getInitialProps = async (
  Context: AppContext
): Promise<Props & AppInitialProps> => {
  const props = await App.getInitialProps(Context);
  const { ctx } = Context;
  const nonce = ctx.req?.headers?.['x-nonce'] as string | undefined;

  return {
    ...props,
    nonce,
  };
};

import '@take-home-task/styles/globals.css';
import { storeWrapper } from '@take-home-task/store';
import NextApp from 'next/app';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, ...rest }:AppProps) {
  const { store, props } = storeWrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

App.getInitialProps = storeWrapper.getInitialAppProps((store) => async (ctx) => {
  const childrenGip = await NextApp.getInitialProps(ctx);
  return {
    pageProps: {
      ...childrenGip.pageProps
    }
  }
});
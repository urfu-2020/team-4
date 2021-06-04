import App from 'next/app';

import './app.css';

export default class MyApp extends App {
    render(): JSX.Element {
        const { Component, pageProps } = this.props;

        return <Component {...pageProps}/>;
    }
}

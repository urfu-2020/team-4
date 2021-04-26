import App, { Container, AppContext, AppInitialProps } from 'next/app';

import './app.css';

export default class MyApp extends App {
    static async getInitialProps({ Component, ctx }: AppContext): Promise<AppInitialProps> {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render(): JSX.Element {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Component {...pageProps}/>
            </Container>
        );
    }
}

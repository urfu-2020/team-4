import Head from 'next/head';

export default function Loader(): JSX.Element {
    return <div className="loader-container">
        <Head>
            <link rel="stylesheet" href="/loader.css"/>
        </Head>
        <div className="lds-ellipsis"><div/><div/><div/><div/></div>
    </div>;
}

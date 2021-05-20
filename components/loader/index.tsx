import Head from 'next/head';

export default function Loader(): JSX.Element {
    const linkStyles = `${process.env.staticBasePath}loader.css`;

    return <div className="loader-container">
        <Head>
            <link rel="stylesheet" href={linkStyles}/>
        </Head>
        <div className="lds-ellipsis"><div/><div/><div/><div/></div>
    </div>;
}

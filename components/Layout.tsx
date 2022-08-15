import axios from "axios";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

const Layout = ({ cats }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Document</title>
            </Head>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const catApi = "http://localhost:8000";
    const res = await axios.get(catApi + "/cats");
    const cats = res.data;
    return {
        props: {
            cats,
        },
    };
};

export default Layout;

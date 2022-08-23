import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import Cats from "../components/Cats";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

const StyledContainer = styled.div``;

const Home: NextPage = ({
    catsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [cats, setCats] = useState([]);
    useEffect(() => {
        setCats(catsData);
    }, [catsData]);
    return (
        <StyledContainer>
            <ToastContainer />
            <Navbar setCats={setCats} />
            <Cats cats={cats} />
        </StyledContainer>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const catApi = "http://localhost:8000";

    const res = await axios.get(catApi + "/cats", {
        withCredentials: true,
    });
    const cats = res.data;

    return {
        props: {
            catsData: cats,
        },
    };
};

export default Home;

import type { NextPage } from "next";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import Cats from "../components/Cats";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

const StyledContainer = styled.div``;

const Home: NextPage = () => {
    return (
        <StyledContainer>
            <ToastContainer />
            <Navbar />
            <Cats />
        </StyledContainer>
    );
};

export default Home;

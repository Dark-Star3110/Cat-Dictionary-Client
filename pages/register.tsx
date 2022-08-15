import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Head from "next/head";
import styled from "styled-components";

const StyledContainer = styled.div``;

const StyleRegiterContainer = styled.div``;

const Register = () => {
    return (
        <StyledContainer>
            <Head>
                <title>Register</title>
            </Head>
            <StyleRegiterContainer>
                <Input placeholder="Email" name="email"></Input>
                <Input placeholder="Password" type="password"></Input>
                <Button variant="outlined">Register</Button>
            </StyleRegiterContainer>
        </StyledContainer>
    );
};

export default Register;

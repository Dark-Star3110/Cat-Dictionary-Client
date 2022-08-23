import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import styled from "styled-components";
import { ToastContext } from "../contexts/ToastContext";
import Link from "next/link";
import Box from "@mui/material/Box";

interface IregisterDataDefault {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatarUrl: string;
}

const StyledContainer = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
`;

const StyleRegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
    background-color: #333;
    border-radius: 5px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -4px rgba(0, 0, 0, 0.1);
`;

const Register = () => {
    const catApi = "http://localhost:8000";
    const route = useRouter();

    const [registerData, setRegisterData] = useState<IregisterDataDefault>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        avatarUrl: "",
    });

    const { notify } = useContext(ToastContext);

    const resetData = () => {
        setRegisterData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            avatarUrl: "",
        });
    };

    const register = async () => {
        try {
            const res = await axios.post(catApi + "/register", registerData);
            if (res.data) {
                resetData();
                notify("success", "Register successfully!");
                setTimeout(() => {
                    route.push("/login");
                }, 5000);
            }
        } catch (error) {
            console.log(error);
            resetData();
            notify("error", "Invalid email or password!");
        }
    };

    return (
        <>
            <StyledContainer>
                <Head>
                    <title>Register</title>
                </Head>
                <StyleRegisterContainer>
                    <Box sx={{ display: "flex" }}>
                        <Input
                            placeholder="FirstName"
                            name="firstName"
                            value={registerData.firstName}
                            onChange={(e) =>
                                setRegisterData((pre) => ({
                                    ...pre,
                                    firstName: e.target.value,
                                }))
                            }
                            sx={{ my: 1, mr: 2 }}
                        ></Input>
                        <Input
                            placeholder="LastName"
                            name="lastName"
                            value={registerData.lastName}
                            onChange={(e) =>
                                setRegisterData((pre) => ({
                                    ...pre,
                                    lastName: e.target.value,
                                }))
                            }
                            sx={{ my: 1 }}
                        ></Input>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Input
                            placeholder="Email"
                            name="email"
                            value={registerData.email}
                            onChange={(e) =>
                                setRegisterData((pre) => ({
                                    ...pre,
                                    email: e.target.value,
                                }))
                            }
                            sx={{ my: 1, mr: 1 }}
                        ></Input>
                        <Input
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={registerData.password}
                            onChange={(e) =>
                                setRegisterData((pre) => ({
                                    ...pre,
                                    password: e.target.value,
                                }))
                            }
                            sx={{ my: 1 }}
                        ></Input>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <Input
                            placeholder="Avatar URL"
                            name="avatarUrl"
                            value={registerData.avatarUrl}
                            onChange={(e) =>
                                setRegisterData((pre) => ({
                                    ...pre,
                                    avatarUrl: e.target.value,
                                }))
                            }
                            sx={{ my: 1, width: "100%" }}
                        ></Input>
                    </Box>
                    <Button
                        variant="outlined"
                        onClick={register}
                        sx={{ my: 1 }}
                    >
                        Register
                    </Button>
                    <Link href="/">
                        <Button>Back to Home</Button>
                    </Link>
                </StyleRegisterContainer>
            </StyledContainer>
        </>
    );
};

export default Register;

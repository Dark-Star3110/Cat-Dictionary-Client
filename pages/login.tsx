import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import axios from "axios";
import { setCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import styled from "styled-components";
import { ToastContext } from "../contexts/ToastContext";
import Link from "next/link";
import { UserContext } from "../contexts/UserContext";

interface ILoginDataDefault {
    email: string;
    password: string;
}

const StyledContainer = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
`;

const StyleLoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
    background-color: #333;
    border-radius: 5px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -4px rgba(0, 0, 0, 0.1);
`;

const Login = () => {
    const catApi = "http://localhost:8000";
    const route = useRouter();

    const [loginData, setLoginData] = useState<ILoginDataDefault>({
        email: "",
        password: "",
    });

    const { notify } = useContext(ToastContext);
    const { getUser } = useContext(UserContext);

    const login = async () => {
        try {
            const res = await axios.post(catApi + "/login", loginData);
            if (res.data) {
                setCookie("token", res.data.token, {
                    expires: new Date(res.data.expiresIn),
                });
                setLoginData({
                    email: "",
                    password: "",
                });
                notify("success", "Login successfully!");
                getUser();
                setTimeout(() => {
                    route.push("/");
                }, 5000);
            }
        } catch (error) {
            console.log(error);
            setLoginData({
                email: "",
                password: "",
            });
            notify("error", "Invalid email or password!");
        }
    };

    return (
        <>
            <StyledContainer>
                <Head>
                    <title>Login</title>
                </Head>
                <StyleLoginContainer>
                    <Input
                        placeholder="Email"
                        name="email"
                        value={loginData.email}
                        onChange={(e) =>
                            setLoginData((pre) => ({
                                ...pre,
                                email: e.target.value,
                            }))
                        }
                        sx={{ my: 1 }}
                    ></Input>
                    <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={(e) =>
                            setLoginData((pre) => ({
                                ...pre,
                                password: e.target.value,
                            }))
                        }
                        sx={{ my: 1 }}
                    ></Input>
                    <Button variant="outlined" onClick={login} sx={{ my: 1 }}>
                        Login
                    </Button>
                    <p>Do not have an account?</p>
                    <Link href="/register">
                        <Button>Register</Button>
                    </Link>
                </StyleLoginContainer>
            </StyledContainer>
        </>
    );
};

export default Login;

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContext } from "../../contexts/ToastContext";
import { UserContext } from "../../contexts/UserContext";
import { Cat } from "../../types/Cat";

const StyledContainer = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
`;

const StyledFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60px;
`;

const UpdateCat = () => {
    const catApi = "http://localhost:8000";
    const { user } = useContext(UserContext);
    const { notify } = useContext(ToastContext);

    const [cat, setCat] = useState({
        name: "",
        origin: "",
        lifeSpan: "",
        description: "",
        imgUrl: "",
        user: user,
    });

    const router = useRouter();
    const paths = router.asPath.split("/");
    const id = paths[paths.length - 1];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(catApi + `/cats/${id}`, {
                    withCredentials: true,
                });
                const catData = res.data;
                setCat(catData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const resetData = () => {
        setCat({
            name: "",
            origin: "",
            lifeSpan: "",
            description: "",
            imgUrl: "",
            user: user,
        });
    };

    const updateCat = async () => {
        try {
            const res = await axios.put(catApi + "/cats/update/" + id, cat);
            const data = res.data;
            console.log(data);
            if (data.success) {
                notify("success", data.message);
                resetData();
            } else {
                notify("error", data.message);
                resetData();
            }
        } catch (error) {
            console.log(error);
            notify("error", "Server Error");
            resetData();
        }
    };

    return (
        <StyledContainer>
            <StyledFormContainer>
                <h2>Update Cat</h2>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Box sx={{ mr: 1, my: 1 }}>
                        <TextField
                            label="Name"
                            variant="filled"
                            value={cat.name}
                            onChange={(e) => {
                                setCat((pre) => ({
                                    ...pre,
                                    name: e.target.value,
                                }));
                            }}
                        />
                    </Box>
                    <Box sx={{ my: 1 }}>
                        <TextField
                            label="Origin"
                            variant="filled"
                            value={cat.origin}
                            onChange={(e) => {
                                setCat((pre) => ({
                                    ...pre,
                                    origin: e.target.value,
                                }));
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Box sx={{ mr: 1, my: 1 }}>
                        <TextField
                            label="Life Span"
                            variant="filled"
                            value={cat.lifeSpan}
                            onChange={(e) => {
                                setCat((pre) => ({
                                    ...pre,
                                    lifeSpan: e.target.value,
                                }));
                            }}
                        />
                    </Box>
                    <Box sx={{ my: 1 }}>
                        <TextField
                            label="Image URL"
                            variant="filled"
                            value={cat.imgUrl}
                            onChange={(e) => {
                                setCat((pre) => ({
                                    ...pre,
                                    imgUrl: e.target.value,
                                }));
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={{ width: "100%", my: 1 }}>
                    <TextField
                        label="Desciption"
                        fullWidth
                        variant="filled"
                        value={cat.description}
                        onChange={(e) => {
                            setCat((pre) => ({
                                ...pre,
                                description: e.target.value,
                            }));
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                        my: 1,
                    }}
                >
                    <Box>
                        <Button variant="outlined" onClick={updateCat}>
                            Update
                        </Button>
                    </Box>
                    <Box>
                        <Button variant="outlined" onClick={resetData}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ my: 1 }}>
                    <Link href="/">
                        <Button>Back to Home</Button>
                    </Link>
                </Box>
            </StyledFormContainer>
        </StyledContainer>
    );
};

export default UpdateCat;

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Cat } from "../../types/Cat";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../../contexts/UserContext";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { ToastContext } from "../../contexts/ToastContext";

const StyledCatIntro = styled.div`
    display: flex;
`;

const StyledCatImg = styled.div`
    width: 50%;
    /* height: 300px; */
    padding: 20px;
    overflow: hidden;
    img {
        border-radius: 10px;
        object-fit: cover;
    }
    img:hover {
        cursor: pointer;
    }
`;

const StyedCatInfo = styled.div`
    width: 50%;
`;

const CatDetail = () => {
    const catApi = "http://localhost:8000";

    const [cat, setCat] = useState<Cat>();
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const paths = router.asPath.split("/");
    const id = paths[paths.length - 1];

    const { user } = useContext(UserContext);
    const { notify } = useContext(ToastContext);

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

    // delete cat
    const deleteCat = async () => {
        try {
            const res = await axios.delete(catApi + `/cats/delete/${id}`);
            const data = res.data;
            if (data.success) {
                notify("success", data.message);
                router.push("/");
            } else {
                notify("error", data.message);
            }
        } catch (error) {
            notify("error", error as string);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ padding: "20px 0" }}>
            {cat ? (
                <Container>
                    <StyledCatIntro>
                        <StyledCatImg>
                            <Image
                                src={
                                    cat.imgUrl
                                        ? cat.imgUrl
                                        : "https://www.kindpng.com/picc/m/552-5524491_david-vuji-cat-avatar-cartoon-hd-png-download.png"
                                }
                                alt={cat.name}
                                width="100%"
                                height="100%"
                                layout="responsive"
                                objectFit="cover"
                            />
                        </StyledCatImg>
                        <StyedCatInfo>
                            <h2>
                                Name:{" "}
                                <span
                                    style={{ color: "orange", fontWeight: 500 }}
                                >
                                    {cat.name}
                                </span>
                            </h2>
                            <h3>
                                Origin:{" "}
                                <span
                                    style={{ color: "aqua", fontWeight: 500 }}
                                >
                                    {cat.origin}
                                </span>
                            </h3>
                            <h3>
                                Life span:{" "}
                                <span
                                    style={{ color: "yellow", fontWeight: 500 }}
                                >
                                    {cat.lifeSpan} years
                                </span>
                            </h3>
                            <h4>
                                Post by:{" "}
                                <span
                                    style={{ color: "#888", fontWeight: 500 }}
                                >
                                    {cat.user.lastName +
                                        " " +
                                        cat.user.firstName}
                                </span>
                            </h4>
                            <div>
                                <span>
                                    <Link href={`/update-cat/${id}`}>
                                        <Button
                                            color="primary"
                                            disabled={cat.user.id !== user?.id}
                                        >
                                            <BorderColorIcon></BorderColorIcon>
                                        </Button>
                                    </Link>
                                </span>
                                <span>
                                    <Button
                                        color="error"
                                        disabled={cat.user.id !== user?.id}
                                        onClick={handleClickOpen}
                                    >
                                        <DeleteIcon></DeleteIcon>
                                    </Button>
                                </span>
                            </div>
                        </StyedCatInfo>
                    </StyledCatIntro>
                    <p>{cat.description}</p>
                    <Link href="/">
                        <Button variant="outlined">Back to Home Page</Button>
                    </Link>

                    {/* dialog */}
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Are you sure you want to delete this cat?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Does this cat upset you? 😭
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                                onClick={async () => {
                                    await deleteCat();
                                    handleClose();
                                }}
                                autoFocus
                            >
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            ) : (
                <h1>Cat not found!!!</h1>
            )}
        </div>
    );
};

export default CatDetail;

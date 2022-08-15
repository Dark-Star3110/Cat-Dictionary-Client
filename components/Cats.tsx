import Container from "@mui/material/Container";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Cat } from "../types/Cat";
import CatItem from "./CatItem";

const StyledCats = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
`;

const Cats = () => {
    const catApi = "http://localhost:8000";

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(catApi + "/cats", {
                    withCredentials: true,
                });
                const cats = res.data;
                setData(cats);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);
    return (
        <Container>
            {loading && <div>Loading</div>}
            {!loading && (
                <StyledCats>
                    {data.map((cat: Cat) => (
                        <CatItem key={cat.id} cat={cat} />
                    ))}
                </StyledCats>
            )}
        </Container>
    );
};

export default Cats;

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

interface CatsProps {
    cats: any[];
}

const Cats = ({ cats }: CatsProps) => {
    return (
        <Container>
            {!cats && <div>Loading</div>}
            {cats && (
                <StyledCats>
                    {cats.map((cat: Cat) => (
                        <CatItem key={cat.id} cat={cat} />
                    ))}
                </StyledCats>
            )}
        </Container>
    );
};

export default Cats;

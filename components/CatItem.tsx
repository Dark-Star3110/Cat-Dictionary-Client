import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Cat } from "../types/Cat";

interface ICatProps {
    cat: Cat;
}

const StyledCatCard = styled.div`
    width: 30%;
    box-shadow: 5px 10px 18px #888888;
    margin: 16px;
    border-radius: 10px;
    transition: transform 0.5s linear;
`;

const StyledCatImg = styled.div`
    width: 100%;
    height: 360px;
    overflow: hidden;
    img {
        border-radius: 10px;
        object-fit: cover;
        transition: transform 0.5s ease;
    }
    img:hover {
        cursor: pointer;
        transform: scale(1.25);
    }
`;

const StyledCatName = styled.div`
    text-align: center;
`;

const CatItem = ({ cat }: ICatProps) => {
    return (
        <Link href={`/cat/${cat.id}`}>
            <StyledCatCard>
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
                <StyledCatName>
                    <h2>{cat.name}</h2>
                </StyledCatName>
            </StyledCatCard>
        </Link>
    );
};

export default CatItem;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
    interface Details {
        title: string;
        image?: string;
        summary: string;
        instructions: string;
        extendedIngredinets?: [];
    }
    let params: any = useParams();
    const [details, setDetails] = useState<Details>({
        title: "loading..",
        summary: "loading..",
        instructions: "loading..",
        extendedIngredinets: [],
    });
    const [activeTab, setActiveTab] = useState("instructions");
    const fetchDetails = async () => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const detailData = await data.json();
        setDetails(detailData);
    };

    useEffect(() => {
        fetchDetails();
    }, [params.id]);

    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt={details.title} />
            </div>
            <Info>
                <Button
                    className={activeTab === "instructions" ? "active" : ""}
                    onClick={() => {
                        setActiveTab("instructions");
                    }}
                >
                    Instructions
                </Button>
                <Button
                    className={activeTab === "ingredinets" ? "active" : ""}
                    onClick={() => {
                        setActiveTab("ingredinets");
                    }}
                >
                    Ingredients
                </Button>
                {activeTab === "instructions" && (
                    <div>
                        <h3
                            dangerouslySetInnerHTML={{
                                __html: details.summary,
                            }}
                        ></h3>
                        <h3
                            dangerouslySetInnerHTML={{
                                __html: details.instructions,
                            }}
                        ></h3>
                    </div>
                )}
                {activeTab === "ingredinets" && (
                    <ul>
                        {details.extendedIngredinets?.map((ingredient: any) => {
                            return (
                                <li key={ingredient.id}>
                                    {ingredient.original}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </Info>
        </DetailWrapper>
    );
}
const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2 {
        margin-bottom: 2rem;
    }
    h3 {
        margin-top: 2rem;
    }
    li {
        font-size: 1.22rem;
        line-height: 2.5rem;
    }
    ul {
        margin-top: 2rem;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`;

const Info = styled.div`
    margin-left: 10rem;
`;

export default Recipe;

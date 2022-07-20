import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Wrapper, Gradient, Card } from "./styles";
import { Link } from "react-router-dom";

function Veggie() {
    const [veggie, setVeggie] = useState([]);

    useEffect(() => {
        getVeggie();
    }, []);
    const getVeggie = async () => {
        const check = localStorage.getItem("veggie");
        if (check) {
            setVeggie(JSON.parse(check));
        } else {
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
            );
            const data = await api.json();
            localStorage.setItem("veggie", JSON.stringify(data.recipes));
            setVeggie(data.recipes);
            console.log(data.recipes);
        }
    };
    return (
        <>
            <Wrapper>
                <h3>Vegeterian Picks</h3>
                <Splide
                    options={{
                        perPage: 3,
                        arrows: false,
                        pagination: false,
                        drage: "free",
                        gap: "5rem",
                    }}
                >
                    {veggie.map(
                        (recipe: {
                            id: number;
                            title: string;
                            image: string;
                        }) => {
                            return (
                                <SplideSlide key={recipe.id}>
                                    <Card>
                                        <Link to={"/recipe/" + recipe.id}>
                                            <p>{recipe.title}</p>
                                            <img
                                                src={recipe.image}
                                                alt={recipe.title}
                                            />
                                            <Gradient />
                                        </Link>
                                    </Card>
                                </SplideSlide>
                            );
                        }
                    )}
                </Splide>
            </Wrapper>
        </>
    );
}

export default Veggie;

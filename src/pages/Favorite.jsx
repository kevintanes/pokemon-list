import { Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Heading, Img, Stack, Text, useToken } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import React from 'react';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/init-firebase';

function Favorite(props) {

    const backgroundColor = useToken('colors', ["#0e1f40"]);
    const [favoriteList, setFavoriteList] = React.useState([]);
    const navigate = useNavigate();

    const getFavoritePokemon = async () => {
        try {
            const favoritePokemonRef = collection(db, "favorite");
            const response = await getDocs(favoritePokemonRef);
            const favoritePokemon = response.docs.map((val) => ({
                name: val.data().name,
                id: val.id,
            }));
            setFavoriteList(favoritePokemon);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        getFavoritePokemon()
    }, [])

    const [allFavorite, setAllFavorite] = React.useState([])
    const [stop, setStop] = React.useState(true);

    React.useEffect(() => {
        const getPokemonFavorite = async () => {
            const favoritePokemon = await Promise.all(
                favoriteList.map(async (val) => {
                    const result = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon/${val.name}`
                    );
                    return result.data;
                })
            );
            setAllFavorite(favoritePokemon);
        };

        if (favoriteList.length) {
            getPokemonFavorite();
        }
    }, [favoriteList]);

    console.log("allFavorite", allFavorite);

    const likePokemon = async (name) => {
        try {
            const favoritePokemonRef1 = query(collection(db, "favorite"), where("name", "==", name));
            const response = await getDocs(favoritePokemonRef1);
            const favoritePokemon = response.docs.map((val) => ({
                data: val.data(),
                id: val.id,
            }));
            // console.log(`response`, response);
            console.log("favoritePokemon", favoritePokemon);

            if (favoritePokemon.length) {
                deleteDoc(doc(db, "favorite", favoritePokemon[0].id))
                    .then(() => console.log("deleted"))
                    .catch(error => console.log(error.message))
            } else {
                const favoritePokemonRef2 = collection(db, "favorite")
                addDoc(favoritePokemonRef2, { name }).then(response => {
                    console.log(response.id);
                    props.getFavoritePokemon();
                }).catch(error => {
                    console.log(error);
                })
            }
        } catch (error) {
            console.log(error);
        } finally {
            props.getFavoritePokemon();
        }
    }

    const printFavoritePokemons = () => {
        return allFavorite?.map((val) => {
            const filter = props.favorite.filter((value) => {
                return value.data.name == val.name
            })
            return <Card w={"full"}
                bgColor={backgroundColor}
                textColor="white"
                direction={'row'}
                overflow='hidden'
                variant='outline'
                shadow={"xl"}
            >
                <Img
                    src={val?.sprites.other.dream_world.front_default}
                    alt={val?.name}
                    width={"120px"}
                    height={"120px"}
                />
                <Stack direction='row' h='250px' px={"1"} py="2">
                    <Divider orientation='vertical' />
                    <Box my="-4">
                        <CardBody>
                            <Heading size={"md"}>{val?.name}</Heading>
                            <Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
                            </Text>
                        </CardBody>
                        <CardFooter justifyContent={"end"}>
                            <Button
                                leftIcon={filter.length > 0 ? <AiFillHeart /> : <AiOutlineHeart />}
                                bgColor="transparent"
                                textColor={"white"}
                                variant="unstyled"
                                fontSize={"3xl"}
                                onClick={() => likePokemon(val?.name)}
                            />
                            <Button
                                bgColor={"orange.400"}
                                textColor="white"
                                onClick={() =>
                                    navigate(`/details/${val?.name}`)
                                }
                            >
                                Details
                            </Button>
                        </CardFooter>
                    </Box>
                </Stack>
            </Card>
        })
    }


    return (
        <Box mx={"5"} py="3">
            <Heading size={"lg"} my="2">
                FAVORITE
            </Heading>
            {
                printFavoritePokemons()
            }
            <Text mt={"4"} textAlign={"center"} fontSize={"2xl"}>
                Voce tem {allFavorite.length} pokemon favorito
            </Text>
        </Box>
    );
}

export default Favorite;
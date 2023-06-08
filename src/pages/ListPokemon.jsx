import { Box, Button, Card, CardBody, CardFooter, CardHeader, SimpleGrid, Heading, Img, Stack, Text, useToken, Skeleton, useToast } from '@chakra-ui/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import CardList from '../components/CardList';
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';
import "./ListPokemon.css"
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import { useDispatch } from 'react-redux';
import { favoriteAction } from '../reducers/favorite';

function ListPokemon(props) {

    const backgroundColor = useToken('colors', ["#0e1f40"]);
    const [isLoad, setIsLoad] = React.useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    setTimeout(() => {
        setIsLoad(true)
    }, 1000);

    const { data, fetchNextPage, hasNextPage, isError: isErrorInfinite } = useInfiniteQuery({
        queryKey: ["pokemons"],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(pageParam - 1) * 10}`)

            const pokemon = await Promise.all(data.results.map(async (val) => {
                const result = await axios.get(val.url)

                return result.data;
            }))

            return { pokemon, pageParam: pageParam + 1 };
        },
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.pageParam

            return nextPage
        }
    });

    const printPokemonList = () => {
        return data?.pages.map((val) => {
            return val?.pokemon.map((value, idx) => {
                return <Skeleton isLoaded={isLoad}>
                    <CardList
                        name={value?.name}
                        image={value?.sprites.other.dream_world.front_default}
                        like={likePokemon}
                        allFavorite={props.favorite}
                    />
                </Skeleton>
            })
        })
    };

    const min = 1;
    const max = 1000;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    const { data: randomPokemon, isError: isErrorRandomPokemon } = useQuery({
        queryKey: ["random-pokemons"],
        queryFn: async () => {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${random}`);

            return data;
        }
    });

    const filter = props.favorite.filter((val) => {
        return val.data.name == randomPokemon?.name
    })

    const printRandomPokemon = () => {
        return <Card w={"full"}
            bgColor={backgroundColor}
            textColor="white"
            direction={"row"}
            overflow='hidden'
            variant='outline'
        >
            <Img
                src={randomPokemon?.sprites.other.dream_world.front_default}
                alt={randomPokemon?.name + " Image"}
                width={"120px"}
                ml="20px"
            />
            <Stack w={"full"}>
                <CardBody>
                    <Heading>{randomPokemon?.name}</Heading>
                    <Text my="6px">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    </Text>
                </CardBody>
                <CardFooter justifyContent={"end"}>
                    
                    <Button
                        leftIcon={filter.length > 0 ?<AiFillHeart /> : <AiOutlineHeart />  }
                        bgColor="transparent"
                        textColor={"white"}
                        variant="unstyled"
                        fontSize={"xl"}
                        onClick={() => likePokemon(randomPokemon?.name)}
                    />
                    <Button
                        bgColor={"orange.400"}
                        textColor="white"
                        onClick={() =>
                            navigate(`/details/${randomPokemon?.name}`)
                        }
                    >
                        Details
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    };

    const likePokemon = async (name,) => {
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


    return (
        <Box mx={4} pt="6">
            {
                isErrorInfinite ? toast({
                    title: "Error",
                    status: "error"
                }) : null
            }

            {
                isErrorRandomPokemon ? toast({
                    title: "Error",
                    status: "error"
                }) : null
            }

            <Box>
                <Text fontSize={"3xl"}>
                    Destaque
                </Text>
                <Skeleton isLoaded={isLoad}>
                    {
                        printRandomPokemon()
                    }
                </Skeleton>
            </Box>

            <Box
                mt={"3"}
            >
                <Text fontSize={"3xl"}>
                    Pokemons
                </Text>
                <InfiniteScroll
                    className="infinite"
                    pageStart={0}
                    loadMore={fetchNextPage}
                    hasMore={hasNextPage}
                >
                    {printPokemonList()}
                </InfiniteScroll>
            </Box>
        </Box >

    );
}

export default ListPokemon;
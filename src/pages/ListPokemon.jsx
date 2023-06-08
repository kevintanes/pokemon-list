import { Box, Button, Card, CardBody, CardFooter, CardHeader, SimpleGrid, Heading, Img, Stack, Text, useToken, Skeleton } from '@chakra-ui/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import CardList from '../components/CardList';
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';
import "./ListPokemon.css"
import { useNavigate } from 'react-router-dom';

function ListPokemon() {

    const [isLoad, setIsLoad] = React.useState(false)
    const navigate = useNavigate();

    setTimeout(() => {
        setIsLoad(true)
    }, 1000)

    const backgroundColor = useToken('colors', ["#0e1f40"]);

    const { data, fetchNextPage, isFetching, hasNextPage, isLoading } = useInfiniteQuery({
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
    })

    const printPokemonList = () => {
        return data?.pages.map((val) => {
            return val?.pokemon.map((value, idx) => {
                return <Skeleton isLoaded={isLoad}>
                    <CardList
                        name={value?.name}
                        image={value?.sprites.other.dream_world.front_default}
                    />
                </Skeleton>
            })
        })
    }

    const min = 1;
    const max = 1000;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    const { data: randomPokemon } = useQuery({
        queryKey: ["random-pokemons"],
        queryFn: async () => {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${random}`);

            return data;
        }
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
                        leftIcon={<AiOutlineHeart />}
                        bgColor="transparent"
                        textColor={"white"}
                        variant="unstyled"
                        fontSize={"xl"}
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
    }

    return (
        <Box mx={4} pt="6">
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
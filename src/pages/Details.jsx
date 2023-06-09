import { Box, Button, Card, CardBody, CardFooter, Divider, Flex, Heading, Img, Progress, Skeleton, Stack, Text, useToken } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineArrowBack } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/init-firebase';

function Details(props) {

    const backgroundColor = useToken('colors', ["#0e1f40"])
    const navigate = useNavigate();

    const [isLoad, setIsLoad] = React.useState(false)
    setTimeout(() => {
        setIsLoad(true)
    }, 1000)

    const params = useParams();
    const nameFromURL = params.pokemon

    const { data } = useQuery({
        queryKey: ["pokemon-detail"],
        queryFn: async () => {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameFromURL}`);

            return data;
        }
    })

    const likePokemon = async (name) => {
        try {
            const favoritePokemonRef1 = query(collection(db, "favorite"), where("name", "==", name));
            const response = await getDocs(favoritePokemonRef1);
            const favoritePokemon = response.docs.map((val) => ({
                data: val.data(),
                id: val.id,
            }));

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

    const filter = props.favorite.filter((val) => {
        return val.data.name == data?.name
    })

    return (
        <Box mx={"8"}>
            <Flex alignItems={"center"}>
                <Button onClick={() => navigate("/")} ml="-4" _hover _active={false} fontSize="3xl">
                    <MdOutlineArrowBack />
                </Button>
                <Text ml={"2"} fontSize="4xl">
                    {data?.name}
                </Text>
            </Flex>
            <Divider bgColor={backgroundColor} />
            <Divider bgColor={backgroundColor} />

            <Skeleton isLoaded={isLoad}>
                <Card w={"full"}
                    bgColor={backgroundColor}
                    textColor="white"
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    shadow={"xl"}
                    mt="4"
                >
                    <Img
                        src={data?.sprites.other.dream_world.front_default}
                        alt={data?.name + " image"}
                        width={"100px"}
                        ml="20px"
                    />
                    <Stack direction='row' h='200px' px={"1"} py="2">
                        <Divider orientation='vertical' />
                        <Box my="-7">
                            <CardBody>
                                <Heading size={"md"}>{data?.name}</Heading>
                                <Text mt={"2"}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </Text>
                            </CardBody>
                            <CardFooter mt="-4" justifyContent={"end"}>
                                <Button
                                    leftIcon={filter.length > 0 ? <AiFillHeart /> : <AiOutlineHeart />}
                                    bgColor="transparent"
                                    textColor={"white"}
                                    variant="unstyled"
                                    fontSize={"3xl"}
                                    onClick={() => likePokemon(data?.name)}
                                />
                            </CardFooter>
                        </Box>
                    </Stack>
                </Card>

            </Skeleton>
            <Text my={2} fontSize="4xl">
                Abilities
            </Text>
            <Divider bgColor={backgroundColor} />
            <Divider bgColor={backgroundColor} />

            <Skeleton isLoaded={isLoad}>
                <Box my="4" >
                    <Flex w={"full"} alignItems="center" justifyContent={"space-between"}>
                        <Text w={"40%"}>
                            Hp:
                        </Text>
                        <Progress colorScheme={"orange"} w={"55%"} value={data?.stats[0].base_stat} bgColor={backgroundColor} />
                    </Flex>
                    <Flex w={"full"} alignItems="center" justifyContent={"space-between"}>
                        <Text w={"40%"}>
                            Attack :
                        </Text>
                        <Progress colorScheme={"orange"} w={"55%"} value={data?.stats[1].base_stat} bgColor={backgroundColor} />
                    </Flex>
                    <Flex w={"full"} alignItems="center" justifyContent={"space-between"}>
                        <Text w={"40%"}>
                            Defense :
                        </Text>
                        <Progress colorScheme={"orange"} w={"55%"} value={data?.stats[2].base_stat} bgColor={backgroundColor} />
                    </Flex>
                    <Flex w={"full"} alignItems="center" justifyContent={"space-between"}>
                        <Text w={"40%"}>
                            Special-Attack :
                        </Text>
                        <Progress colorScheme={"orange"} w={"55%"} value={data?.stats[3].base_stat} bgColor={backgroundColor} />
                    </Flex >
                    <Flex w={"full"} alignItems="center" justifyContent={"space-between"}>
                        <Text w={"40%"}>
                            Special-Defence :
                        </Text>
                        <Progress colorScheme={"orange"} w={"55%"} value={data?.stats[4].base_stat} bgColor={backgroundColor} />
                    </Flex>
                    <Flex w={"full"} alignItems="center" justifyContent={"space-between"}>
                        <Text w={"40%"}>
                            Speed :
                        </Text>
                        <Progress colorScheme={"orange"} w={"55%"} value={data?.stats[5].base_stat} bgColor={backgroundColor} />
                    </Flex>
                </Box>
            </Skeleton>
        </Box>
    );
}

export default Details;
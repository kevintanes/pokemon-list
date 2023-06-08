import { Box, Button, Card, CardBody, CardFooter, Divider, Flex, Heading, Img, Progress, Skeleton, Stack, Text, useToken } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineArrowBack } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

function Details() {

    const backgroundColor = useToken('colors', ["#0e1f40"])

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

    return (
        <Box mx={"8"}>
            <Flex>
                <Text as={"button"} fontSize="4xl">
                    <MdOutlineArrowBack />
                </Text>
                <Text ml={"10"} fontSize="4xl">
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
                        width={"120px"}
                        ml="20px"
                    />
                    <Stack direction='row' h='250px' px={"1"} py="2">
                        <Divider orientation='vertical' />
                        <Box my="-4">
                            <CardBody>
                                <Heading size={"md"}>{data?.name}</Heading>
                                <Text mt={"2"}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </Text>
                            </CardBody>
                            <CardFooter justifyContent={"end"}>
                                <Button
                                    leftIcon={<AiOutlineHeart />}
                                    bgColor="transparent"
                                    textColor={"white"}
                                    variant="unstyled"
                                    fontSize={"3xl"}
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
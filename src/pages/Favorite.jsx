import { Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Heading, Img, Stack, Text, useToken } from '@chakra-ui/react';
import React from 'react';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function Favorite() {

    const backgroundColor = useToken('colors', ["#0e1f40"])

    return (
        <Box mx={"5"} py="3">
            <Heading size={"lg"} my="2">
                FAVORITE
            </Heading>
            <Card w={"full"}
                bgColor={backgroundColor}
                textColor="white"
                direction={'row'}
                overflow='hidden'
                variant='outline'
                shadow={"xl"}
            >
                <Img
                    src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
                    alt='Pikachu'
                    width={"120px"}
                />
                <Stack direction='row' h='250px' px={"1"} py="2">
                    <Divider orientation='vertical' />
                    <Box my="-4">
                        <CardBody>
                            <Heading size={"md"}>Pikachu</Heading>
                            <Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
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
                            <Button
                                bgColor={"orange.400"}
                                textColor="white"
                            >
                                Details
                            </Button>
                        </CardFooter>
                    </Box>
                </Stack>
            </Card>
            <Text mt={"4"} textAlign={"center"} fontSize={"2xl"}>
                Voce tem 1 pokemon favorito
            </Text>
        </Box>
    );
}

export default Favorite;
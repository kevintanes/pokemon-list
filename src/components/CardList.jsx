import { Box, Button, Card, CardBody, CardFooter, Flex, Img, Text, useToken } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CardList(props) {

    const navigate = useNavigate();
    const backgroundColor = useToken('colors', ["#0e1f40"]);

    return (
        <Card bgColor={backgroundColor} textAlign={"center"} maxW={"md"}>
            <CardBody
            >
                <Img
                    src={props.image}
                    w="100px"
                    h="100px"
                    mx="auto"
                />
                <Text
                    textColor={"white"}
                    fontSize="lg"
                >
                    {props.name}
                </Text>
            </CardBody>
            <CardFooter mt={"-4"}>
                <Box mx="auto" w={"24"} bgColor="purple.600" textColor={"white"} borderRadius="full" fontSize={"2xl"} >
                    <Flex justifyContent="space-evenly" alignItems={"center"} my="4px">
                        <Text as={"button"}>
                            <AiOutlineHeart />
                        </Text>
                        <Text as={"button"}>
                            <AiOutlineInfoCircle onClick={() => navigate(`details/${props.name}`)} />
                        </Text>
                    </Flex>
                </Box>
            </CardFooter>
        </Card>
    );
}

export default CardList;
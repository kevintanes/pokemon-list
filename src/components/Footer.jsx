import { Box, Button, Circle, Flex, Text, useToken } from '@chakra-ui/react';
import React from 'react';
import { TbBookmark, TbPokeball } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Footer() {

    const backgroundColor = useToken('colors', ["#0e1f40"])
    const navigate = useNavigate();

    const totalFavorite = useSelector((state) => state.favoriteReducer.length);

    return (
        <Box
            bgColor={backgroundColor}
            borderRadius="lg"
            boxSize={"16"}
            w={"2xs"}
            pos={"fixed"}
            bottom="0"
            left="0"
            right="0"
            mx={"auto"}
        >
            <Flex
                textColor={"white"}
                justifyContent="space-evenly"
                mt={"3"}
            >
                <Button bgColor={backgroundColor} onClick={() => navigate("/")} _hover _active={false}>
                    <Flex flexDirection={"column"} alignItems="center" textColor={"white"}>
                        <TbPokeball fontSize={"30px"} />
                        <Text>Home</Text>
                    </Flex>
                </Button>
                <Button bgColor={backgroundColor} onClick={() => navigate("/favorite")} _hover _active={false}>
                    <Flex flexDirection={"column"} alignItems="center" textColor={"white"}>
                        <TbBookmark fontSize={"30px"} />
                        {
                            totalFavorite == 0 ? null :
                                <Circle fontSize={"xs"} minW={"4"} minH="4" bgColor={"red.500"} pos="absolute" top={"-2"} right={"7"}>
                                    {
                                        totalFavorite
                                    }
                                </Circle>
                        }
                        <Text>
                            Favorite
                        </Text>
                    </Flex>
                </Button>
            </Flex>
        </Box>

    );
}

export default Footer;
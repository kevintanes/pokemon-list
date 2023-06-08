import { Button } from '@chakra-ui/react';
import React from 'react';
import { MdVerticalAlignTop } from 'react-icons/md';


function BackToTop() {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <Button
            leftIcon={<MdVerticalAlignTop fontSize={"45px"} color={"white"} />}
            variant="unstyled"
            pos={"fixed"}
            bottom={"3"}
            onClick={() => scrollToTop()}
        />
    );
}

export default BackToTop;
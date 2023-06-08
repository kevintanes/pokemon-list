import './App.css';
import { Box, Button, Img, useToken } from '@chakra-ui/react';
import ListPokemon from './pages/ListPokemon';
import { Route, Routes } from 'react-router-dom';
import Details from './pages/Details';
import Favorite from './pages/Favorite';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {

  const backgroundColor = useToken('colors', ["#f2f2f2"])


  return (

    <Box mx={"auto"} maxW={"375px"} bgColor={backgroundColor} minHeight="100vh">
      <Routes>
        <Route path="/" element={<ListPokemon />} />
        <Route path="/details/:pokemon" element={<Details />} />
        <Route path='/favorite' element={<Favorite />} />
      </Routes>
      <Footer />
      <BackToTop />

    </Box>

    // <Box bgColor={`${backgroundColor}`} height="100vh">
    //   <Img src={logo} width="500px" height={"250px"} mx={"auto"}/>
    // </Box>

  );
}

export default App;

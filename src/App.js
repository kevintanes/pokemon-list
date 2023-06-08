import './App.css';
import { Box, Button, Img, useToken } from '@chakra-ui/react';
import ListPokemon from './pages/ListPokemon';
import { Route, Routes } from 'react-router-dom';
import Details from './pages/Details';
import Favorite from './pages/Favorite';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './lib/init-firebase';
import { useDispatch } from 'react-redux';
import { favoriteAction } from './reducers/favorite';

function App() {

  const backgroundColor = useToken('colors', ["#f2f2f2"]);

  const dispatch = useDispatch()
  const [favorite, setFavorite] = React.useState([]);

  const getFavoritePokemon = async () => {
    try {
      const favoritePokemonRef = collection(db, "favorite");
      const response = await getDocs(favoritePokemonRef);
      const favoritePokemon = response.docs.map((val) => ({
        data: val.data(),
        id: val.id,
      }));
      // console.log(`favoritePokemon`, favoritePokemon);
      setFavorite(favoritePokemon);
      dispatch(favoriteAction(favoritePokemon.length));
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getFavoritePokemon()
  }, [])

  return (


    <Box mx={"auto"} maxW={"375px"} bgColor={backgroundColor} minHeight="100vh">
      <Routes>
        <Route path="/" element={<ListPokemon getFavoritePokemon={getFavoritePokemon} favorite={favorite} />} />
        <Route path="/details/:pokemon" element={<Details getFavoritePokemon={getFavoritePokemon} favorite={favorite} />} />
        <Route path='/favorite' element={<Favorite getFavoritePokemon={getFavoritePokemon} favorite={favorite} />} />
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

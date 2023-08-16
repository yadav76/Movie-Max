import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';

import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice';

import Header from "./components/header/Header"
import Footer from './components/footer/Footer'
import Details from './pages/details/Details'
import PageNotFound from './pages/404/PageNotFound'
import Explore from './pages/explore/Explore'
import Home from './pages/home/Home'
import SearchResult from './pages/searchResult/SearchResult'


function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      // console.log(res);

      // now get all 3 types of images from /configuration
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }

      dispatch(getApiConfiguration(url))
    });
  };

  // for Storing Genres of Movies and TV-Shows at start of App in Redux store
  const genresCall = async () => {
    let promises = [];               //for storing promises of movie or tvshow genre
    let endPoints = ["tv", "movie"];  //for getting genre of movie or Tvshow
    let allGenres = [];              //for storing final result

    // Iterate over endPoints Array and call api
    endPoints.forEach(url => promises.push(fetchDataFromApi(`/genre/${url}/list`)))

    // console.log(promises);

    // Now get Original Data from Promises stored in promises array by using Promise.all()
    const data = await Promise.all(promises);  //this will return data from both 'tv' & 'movie' promises at once

    // console.log(data);

    // Now Store Original Data as Id as Key and Data as Value in allGenres array
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    // console.log(allGenres);

    // Now store allGenres into Store.jsx
    dispatch(getGenres(allGenres));
  }

  return (
    <div>

      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App

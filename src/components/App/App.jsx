import { Loader } from "../Loader/Loader"
import SearchBar from "../SearchBar/SearchBar"
import css from '../App/App.module.css'
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import { useState } from "react"
import axios from "axios"
import { ImageGallery } from "../ImageGallery/ImageGallery"
import { LoadMoreBtn } from "../LoadMoreBtn/LoadMoreBtn"
import { ImageModal } from '../ImageModal/ImageModal';
import React from 'react';



const ACCESS_KEY = 'X00U6wtfr6r4YG60g9dxY_jMEvm5aOj5PQthIwf2FB0'
const SECRET_KEY = 'dfItK0ZlYhRA00niYfOSBKZZjb_Qd8GWEuYAevJCWKM'


function App() {

  
  const [selectedImage, setSelectedImage] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(2);
  const [modalIsOpen, setIsOpen] = React.useState(false);
        

  function openModal(image) {
    setSelectedImage(image);
    setIsOpen(true);
  }
  
  
  const handleSearch = async (topic) => {
    try {
      setTopic(topic)
      setArticles([]);
      setError(false);
      setLoading(true);
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: topic,
            page: 1,
            client_id: ACCESS_KEY,
            per_page: 10,
          },
        }
      );
      console.log(response.data.results);
      
      setArticles(response.data.results);
    } catch (error) {
      console.log(error);
      
      setError(true);
    } finally {
      
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const nextPage = page + 1;
      setPage(nextPage);
      setError(false);
      setLoading(true);
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: topic,
            page: page,
            client_id: ACCESS_KEY,
            per_page: 10,
          },
        }
      );
      console.log(response.data.results);
      
      setArticles(prevs => [...prevs, ...response.data.results]);
    } catch (error) {
      console.log(error);
      
      setError(true);
    } finally {
      
      setLoading(false);
    }
  };
    
  


    
  return (
  <div className={css.comps}>
    <SearchBar onSearch={handleSearch}/>
    {loading && <Loader />}
    {error && <ErrorMessage />}
    {articles.length > 0 && <ImageGallery result={articles} openModal={openModal}/>}
    {selectedImage && (<ImageModal data={selectedImage} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>
)}    {articles.length > 0 && <LoadMoreBtn onSubmit={loadMore}/>}
  </div> 
)
};


export default App

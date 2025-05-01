import { Loader } from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import css from '../App/App.module.css';
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useState, useEffect } from "react";
import axios from "axios";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { LoadMoreBtn } from "../LoadMoreBtn/LoadMoreBtn";
import { ImageModal } from '../ImageModal/ImageModal';
import React from 'react';

const ACCESS_KEY = 'X00U6wtfr6r4YG60g9dxY_jMEvm5aOj5PQthIwf2FB0';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [topic, setTopic] = useState('');
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const handleSearch = (newTopic) => {
    setTopic(newTopic);
    setArticles([]); 
    setPage(1);      
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (!topic) return;

    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: topic,
            page: page,
            client_id: ACCESS_KEY,
            per_page: 10,
          },
        });

        setArticles(prev =>
          page === 1 ? response.data.results : [...prev, ...response.data.results]
        );
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [topic, page]); 

  return (
    <div className={css.comps}>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {articles.length > 0 && <ImageGallery result={articles} openModal={openModal} />}
      {selectedImage && <ImageModal data={selectedImage} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />}
      {articles.length > 0 && !loading && <LoadMoreBtn onSubmit={loadMore} />}
    </div>
  );
}

export default App;

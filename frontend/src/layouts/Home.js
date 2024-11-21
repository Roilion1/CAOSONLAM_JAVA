import React from 'react'
import Slider from '../pages/home/Slider'
import Deal from '../pages/home/Deal';
import Apparel from '../pages/home/Apparel';
import Request from '../pages/home/Request';
import Electronics from '../pages/home/Electronics';
import Item from '../pages/home/Items';
import Services from '../pages/home/Services';
import Region from '../pages/home/Region';
import Article from "../pages/home/Article";
import Section1 from '../pages/home/Section1';
import { useState, useEffect } from 'react';
import { GET_ALL } from '../api/apiService';
function Home(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        GET_ALL('categories')
            .then((response) => {
                console.log("API Response:", response); // Log the entire API response
                if (response && response.content) {
                    setCategories(response.content); // Access response.content
                } else {
                    setCategories([]);
                }
            })
            .catch(error => {
                console.error('Failed to fetch categories:', error);
                setCategories([]); // Handle the error and set categories to an empty array
            });
    }, []);


    // Removed filtering based on `isHome` property
    const filteredCategories = categories; // or use any other valid filtering logic

    console.log("Filtered Categories:", filteredCategories);
    return (
        <div class="container">
            <Slider />
            {filteredCategories.length > 0 &&
                filteredCategories.map((row) => (
                    <Section1 key={row.categoryId} categoryName={row.categoryName} categoryId={row.categoryId} />
                ))}
            <Deal />
            <Apparel />
            <Electronics />
            <Request />
          <Item />
          <Services />
          <Region />
          <Article />
          
        </div>
    );
}
export default Home;
import React from 'react';
import '../../App.css';
import Topic from '../topic';
import Cards from '../Cards';
import FirstSection from '../FirstSection';
import SecondSection from '../SecondSection';

import ImageSlider from '../ImageSlider';
import SliderData from '../SliderData';
import Footer from '../Footer';



function Home() {
  return (
    <>
    <Topic/>
     <FirstSection/>
     <ImageSlider slides={SliderData}/>
     <Cards/>
     <SecondSection/>
     
    
    </>
  );
}

export default Home;
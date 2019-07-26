import React from 'react';
import './App.css';
import Searchbar from "./Searchbar/searchbar";
import Header from "./Header/header";
import SimpleReactGauge from "./GenericComponents/SimpleReactGauge";
import ResultCard from "./SentimentResult/ResultCard";

function App() {
  return (
    <div className="App">
        <Header/>
        <Searchbar/>
        <ResultCard confidence={50} sentiment={'negative'} topic={'Trump'} subreddit={'r/AskAnAmerican'}/>
        <ResultCard confidence={50} sentiment={'positive'} topic={'Kitties'} subreddit={'r/aww'}/>
    </div>
  );
}

export default App;

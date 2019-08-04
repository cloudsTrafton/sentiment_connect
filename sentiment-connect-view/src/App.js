import React from 'react';
import './App.css';
import SearchArea from "./SearchFields/SearchArea";
import Header from "./Header/header";
import SimpleReactGauge from "./GenericComponents/SimpleReactGauge";
import ResultCard from "./SentimentResult/ResultCard";
import InputAreaWrapper from "./SearchFields/inputAreaWrapper";

function App() {
  return (
    <div className="App">
        <Header/>
        <div style={{padding: '2rem 4rem'}}>
        <InputAreaWrapper/>
            <div style={{marginTop: '1rem'}}>
                <ResultCard confidence={50} sentiment={'negative'} topic={'Trump'} subreddit={'r/AskAnAmerican'}/>
                <ResultCard confidence={50} sentiment={'positive'} topic={'Kitties'} subreddit={'r/aww'}/>
            </div>
        </div>
    </div>
  );
}

export default App;

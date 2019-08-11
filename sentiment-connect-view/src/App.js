import React from 'react';
import './App.css';
import Header from "./Header/header";
import ResultCard from "./SentimentResult/ResultCard";
import InputAreaWrapper from "./SearchFields/inputAreaWrapper";
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import Route from "react-router-dom/es/Route";

function App() {
  return (
      <BrowserRouter>
          <Route exact={true} path="/" render={() => (
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
          )}/>
          <Route exact={true} path="/about" render={() => (
              <div>Put something here! Include the Header component (copy and paste line 14)
              This will render the component - each one of those custom tags, like Header, is a reusable piece of code.</div>
              )}/>
      </BrowserRouter>
  );
}

export default App;

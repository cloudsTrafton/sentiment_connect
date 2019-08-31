import React from 'react';
import SearchArea from "./SearchArea";
import Card from "react-bootstrap/es/Card";

/**
 * Wraps all of the user input areas into its onw very pritty little component
 */
class InputAreaWrapper extends React.Component {

    render() {
        return (
                <Card style={{marginBottom: '50px'}}>
                    <Card.Header>
                    </Card.Header>
                        <Card.Body>
                            <Card.Title>Discover Sentiments</Card.Title>
                            <Card.Text style={{marginLeft: '4rem', marginRight: '4rem'}}>
                                Use the search feature's below to retrieve sentiment analysis from Reddit surrounding
                                any topic fo your choice. Narrow or customize your search by searching within comments,
                                original posts, or by subreddit.
                            </Card.Text>
                            <div align="center">
                                <SearchArea/>
                            </div>
                        </Card.Body>
                </Card>
        );

    }

}

export default InputAreaWrapper;
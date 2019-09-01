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
                        <Card.Title>Find Sentiment Data</Card.Title>
                    </Card.Header>
                        <Card.Body>
                            <Card.Title>Step 1: Find Subreddits</Card.Title>
                            <Card.Text style={{marginLeft: '4rem', marginRight: '4rem'}}>
                                Use the search feature below to find a subreddits that contain posts with your search
                                term. Then
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
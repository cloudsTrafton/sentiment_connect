import React from 'react';
import SearchArea from "./SearchArea";
import Card from "react-bootstrap/es/Card";
import Nav from "react-bootstrap/es/Nav";

/**
 * Wraps all of the user input areas into its onw very pritty little component
 */
class InputAreaWrapper extends React.Component {

    reloadPage = () => {
        window.location.reload();
    }

    render() {
        return (
                <Card style={{marginBottom: '50px'}}>
                    <Card.Header>
                        <Nav.Link href="" style={{textAlign: 'right'}} onClick={this.reloadPage}>Reset Form</Nav.Link>
                        <Card.Title>Find Sentiment Data
                        </Card.Title>
                    </Card.Header>
                        <Card.Body>
                            <Card.Title>Step 1: Find Subreddits</Card.Title>
                            <Card.Text style={{marginLeft: '4rem', marginRight: '4rem'}}>
                                Use the search feature below to find a subreddits that contain posts with your search
                                term.
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
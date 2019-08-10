import React from 'react';
import PropTypes from 'prop-types';
import SearchArea from "./SearchArea";
import CheckBoxArea from "./CheckBoxArea";
import Card from "react-bootstrap/es/Card";
import Button from "react-bootstrap/es/Button";
import Accordion from "react-bootstrap/es/Accordion";

/**
 * Wraps all of the user input areas into its onw very pritty little component
 */
class InputAreaWrapper extends React.Component {

    render() {
        return (
            <Accordion defaultActiveKey="0" style={{marginBottom: '50px'}}>
                <Card style={{marginBottom: '50px'}}>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{align: 'right'}}>
                            Toggle Open
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
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
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );

    }

}

export default InputAreaWrapper;
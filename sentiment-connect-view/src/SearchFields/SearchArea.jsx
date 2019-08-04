import React from 'react';
import {Form, Button} from 'react-bootstrap'
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";

class SearchArea extends React.Component {

    render() {
        return(
                <Form style={{marginLeft: '100px', marginRight: '100px', marginBottom: '20px', width: '40rem'}}>
                    <Form.Group as={Row} controlId="formHorizontalSearchTerm">
                        <Form.Label column sm={3}>
                            Search Term
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="search" placeholder="Trump, vegans, etc." />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalSubreddit">
                        <Form.Label column sm={3}>
                            Subreddit
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="search" placeholder="r/awww, Politics, etc." />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHCheckBoxes">
                        <Form.Label column sm={4}>
                            Search Options
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Check label="Search in Posts" />
                        </Col>
                        <Col sm={4}>
                            <Form.Check label="Search in Comments" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit" id="get-sentiment-button">Analyze</Button>
                        </Col>
                    </Form.Group>
                </Form>
    );
    }
}

export default SearchArea;
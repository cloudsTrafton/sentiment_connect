import React from 'react';
import {Form, Button} from 'react-bootstrap'
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";

class SearchArea extends React.Component {

    /**
     * When something in the form changes, update the state of the component.
     * @param event the browser event, such as filling out the form.
     */
    handleOnChange = (event) => {
        this.setState({[event.target.id]: event.target.value},  null);
    };

    /**
     * Once the user presses the button, fire off the event to submit to the backend for processing.
     * @param event
     */
    handleSubmission = (event) => {
        // TODO
        console.log("Yay submitted the following: ");
        console.log(this.state);
    };

    render() {
        return(
                <Form style={{marginLeft: '100px', marginRight: '100px', marginBottom: '20px', width: '40rem'}}>
                    <Form.Group as={Row} controlId="searchTerm">
                        <Form.Label column sm={3}>
                            Search Term
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="search" placeholder="Trump, vegans, etc." onChange={this.handleOnChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="subreddit">
                        <Form.Label column sm={3}>
                            Subreddit
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="search" placeholder="r/awww, Politics, etc." onChange={this.handleOnChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>
                            Search Options
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Group controlId="searchPosts">
                                <Form.Check label="Search in Posts" checked='checked' onChange={this.handleOnChange}/>
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group controlId="searchComments">
                                <Form.Check label="Search in Comments" checked='checked' onChange={this.handleOnChange}/>
                            </Form.Group>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2}}>
                            <Button type="button" id="get-sentiment-button" onClick={this.handleSubmission}>Analyze</Button>
                        </Col>
                    </Form.Group>
                </Form>
    );
    }
}

export default SearchArea;
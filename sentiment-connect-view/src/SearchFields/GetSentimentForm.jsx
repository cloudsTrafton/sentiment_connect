import React from 'react';
import Card from "react-bootstrap/es/Card";
import PropTypes from "prop-types";
import {getSentimentFromSearchTermSubreddit} from "../ServiceCalls/AjaxCalls";
import {Button, DropdownItem, Form} from "react-bootstrap";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import DropdownButton from "react-bootstrap/es/DropdownButton";

class GetSentimentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subreddit: 'Select a Subreddit',
        };
    }

    /**
     * Once the user presses the button, fire off the event to submit to the backend for processing.
     * @param event
     */
    handleSubmission = (event) => {
        // TODO
        let isValidInput = this.validateInput();
        if (!isValidInput) {
            // TODO show some red outline or something and some kind of message saying the
            // input was bad.
        } else {
            console.log("Yay submitted the following: ");
            getSentimentFromSearchTermSubreddit(this.state.subreddit, this.state.searchTerm);
        }
    };

    /**
     * Validate the input form based on requirements. (TODO)
     * @returns {boolean}
     */
    validateInput = () => {
        let isValidInput = true;
        if (this.state.subreddit === '' || this.state.subreddit === undefined) {
            isValidInput = false;
        }
        if (this.state.searchTerm === '' || this.state.searchTerm === undefined) {
            isValidInput = false;
        }
        return isValidInput;
    };

    /**
     * Generates the possible options for subreddit to choose from.
     */
    generateSubredditOptions = (subredditList) => {
        let items = [];
        for (let i = 0; i < 25; i++) {
            console.log(subredditList[i]);
            items.push(<DropdownItem key={i} eventKey={subredditList[i].key} value={subredditList[i].key}>{subredditList[i].key}</DropdownItem>);
        }
        return items;
    };

    /**
     * Handle changes to the subreddit dropdown. Set the state to the newly chosen subreddit.
     */
    handleSubredditDropdownSelect = (event) => {
        this.setState({subreddit: event},  null);
    };


    render() {
        const subreddits = this.props.subreddits;

        return (
            <Card style={{marginBottom: '50px'}}>
                <Card.Body>
                    <Card.Title>Step 2: Get Sentiment Information</Card.Title>
                    <Card.Text style={{marginLeft: '4rem', marginRight: '4rem'}}>
                        Select a subreddit and click to retrieve sentiment analysis!
                    </Card.Text>
                    <div align="center">
                        <Form style={{marginLeft: '100px', marginRight: '100px', marginBottom: '20px', width: '40rem'}}>
                            <Form.Group as={Row} controlId="searchTermWrapper">
                                <Form.Label column sm={3} style={{textAlign: 'left'}}>
                                    Search Term
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control plaintext readonly id="searchTerm" defaultValue={this.props.searchTerm}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="subredditControl">
                                <Form.Label column sm={3} style={{textAlign: 'left'}}>
                                    Subreddit
                                </Form.Label>
                                <Col lg={9}>
                                    <Row>
                                        <Col>
                                            <DropdownButton id="subredditSelect" onSelect={this.handleSubredditDropdownSelect} title={this.state.subreddit}>
                                                {this.generateSubredditOptions(subreddits)}
                                            </DropdownButton>
                                        </Col>
                                    </Row>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2}}>
                                    <Button type="button" id="find-sentiment-info-buttons">Get Sentiment Information</Button>
                                </Col>
                            </Form.Group>
                            {/*<Form.Group as={Row} controlId="subreddit">*/}
                            {/*    <Form.Label column sm={3} style={{textAlign: 'left'}}>*/}
                            {/*        Subreddit*/}
                            {/*    </Form.Label>*/}
                            {/*    <Col sm={9}>*/}
                            {/*        <Form.Control type="search" placeholder="r/awww, Politics, etc." onChange={this.handleOnChange}/>*/}
                            {/*    </Col>*/}
                            {/*</Form.Group>*/}



                            {/*<Form.Group as={Row} controlId="frequency">*/}
                            {/*    <Form.Label column sm={3} style={{textAlign: 'left'}}>*/}
                            {/*        Frequency*/}
                            {/*    </Form.Label>*/}
                            {/*    <Row sm={9}>*/}
                            {/*        <Row style={{marginLeft: '55px'}}>*/}
                            {/*        {frequency_options.map(frequency => (*/}
                            {/*            <div key={frequency} style={{padding: '0px'}}>*/}
                            {/*                <Form.Check inline label={frequency} type="radio"/>*/}
                            {/*            </div>*/}
                            {/*        ))}*/}
                            {/*        </Row>*/}
                            {/*    </Row>*/}
                            {/*</Form.Group>*/}
                            {/*<Form.Group as={Row}>*/}
                            {/*    <Form.Label column sm={3} style={{textAlign: 'left'}}>*/}
                            {/*        Search Options*/}
                            {/*    </Form.Label>*/}
                            {/*    <Col sm={4}>*/}
                            {/*        <Form.Group controlId="searchPosts">*/}
                            {/*            <Form.Check label="Search in Posts" onChange={this.handleOnChange}/>*/}
                            {/*        </Form.Group>*/}
                            {/*    </Col>*/}
                            {/*    <Col sm={5}>*/}
                            {/*        <Form.Group controlId="searchComments">*/}
                            {/*            <Form.Check label="Search in Comments" onChange={this.handleOnChange}/>*/}
                            {/*        </Form.Group>*/}
                            {/*    </Col>*/}
                            {/*</Form.Group>*/}
                            {/*<Form.Group as={Row}>*/}
                            {/*    <Col sm={{ span: 10, offset: 2}}>*/}
                            {/*        <Button type="button" id="get-sentiment-button" onClick={this.handleSubmission}>Analyze</Button>*/}
                            {/*    </Col>*/}
                            {/*</Form.Group>*/}
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        );
    }

}



GetSentimentForm.propTypes = {
    subreddits: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired
};


export default GetSentimentForm;
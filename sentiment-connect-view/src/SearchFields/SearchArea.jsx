import React from 'react';
import {Form, Button} from 'react-bootstrap'
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import DropdownButton from "react-bootstrap/es/DropdownButton";
import Dropdown from "react-bootstrap/es/Dropdown"
import {getSentimentFromSearchTermSubreddit} from "../ServiceCalls/AjaxCalls";

class SearchArea extends React.PureComponent {

    /**
     * When something in the form changes, update the state of the component.
     * @param event the browser event, such as filling out the form.
     */
    handleOnChange = (event) => {
        this.setState({[event.target.id]: event.target.value},  null);
        if (event.target.type === 'checkbox') {
            this.setState({[event.target.id + "Checked"]: !event.target.value},  null);
            console.log(event.target.value);
        }
        };

    handleDropdownSelect = (event) => {
        // TODO
    };

    /**
     * Validate the input form based on requirements.
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
            console.log(this.state);
            getSentimentFromSearchTermSubreddit(this.state.subreddit, this.state.searchTerm);
        }
    };

    render() {

        const frequency_options = ['minute', 'hour', 'day', 'week', 'month', 'year'];

        return(
                <Form style={{marginLeft: '100px', marginRight: '100px', marginBottom: '20px', width: '40rem'}}>
                    <Form.Group as={Row} controlId="searchTerm">
                        <Form.Label column sm={3} style={{textAlign: 'left'}}>
                            Search Term
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="search" placeholder="Trump, vegans, etc." onChange={this.handleOnChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="subreddit">
                        <Form.Label column sm={3} style={{textAlign: 'left'}}>
                            Subreddit
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="search" placeholder="r/awww, Politics, etc." onChange={this.handleOnChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="timeFrame">
                        <Form.Label column sm={3} style={{textAlign: 'left'}}>
                            Time Frame
                        </Form.Label>
                        <Col sm={9}>
                            <Row>
                                <Col sm={4}>
                                    <Form.Control type="number" placeholder="5,6,7,8 etc." onChange={this.handleOnChange}/>
                                </Col>
                                <Col sm={5}>
                                    <DropdownButton
                                                    title="Time Unit"
                                                    id="category-dropdown">
                                        {frequency_options.map((freq, i) =>
                                            <Dropdown.Item eventKey={freq}>{freq +"s"}</Dropdown.Item>)
                                        }
                                    </DropdownButton>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="frequency">
                        <Form.Label column sm={3} style={{textAlign: 'left'}}>
                            Frequency
                        </Form.Label>
                        <Row sm={9}>
                            <Row style={{marginLeft: '55px'}}>
                            {frequency_options.map(frequency => (
                                <div key={frequency} style={{padding: '0px'}}>
                                    <Form.Check inline label={frequency} type="radio"/>
                                </div>
                            ))}
                            </Row>
                        </Row>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3} style={{textAlign: 'left'}}>
                            Search Options
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Group controlId="searchPosts">
                                <Form.Check label="Search in Posts" onChange={this.handleOnChange}/>
                            </Form.Group>
                        </Col>
                        <Col sm={5}>
                            <Form.Group controlId="searchComments">
                                <Form.Check label="Search in Comments" onChange={this.handleOnChange}/>
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
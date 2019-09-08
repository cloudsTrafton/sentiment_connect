import React from 'react';
import {Button, DropdownItem, Form} from 'react-bootstrap'
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import {getSentimentFromSearchTermSubreddit, getSubRedditsForSearchTerm} from "../ServiceCalls/AjaxCalls.js";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/es/DropdownButton";
import Card from "react-bootstrap/Card";
import GetSentimentForm from "./GetSentimentForm";
import Loader from "react-loader-spinner";

class SearchArea extends React.PureComponent {


    constructor(props) {

        super(props);
        this.frequency_options = ['hour', 'day', 'week', 'month', 'year'];
        this.searchTypes = ['submission', 'comment'];


        this.state = {
            searchTerm: '',
            timeUnit: 'Select Time Unit',
            timeNum: 0,
            frequency: 'Select Sample Frequency',
            searchType: this.searchTypes[0],
            showSubreddits: false,
            validationError: false,
            findSubredditsButtonPressed: false,
            subredditsList: []
        };


    }

    /**
     * When something in the form changes, update the state of the component.
     * @param event the browser event, such as filling out the form.
     */
    handleOnChange = (event) => {
        this.setState({[event.target.id]: event.target.value},  null);
        };

    /**
     * When the user picks a time unit from the dropdown, set its event (forced by the use of eventkey in the component)
     * to the timeUnit portion of the component's state.
     * @param event the unit of time the user wishes to use
     */
    handleTimeDropdownSelect = (event) => {
        this.setState({timeUnit: event},  null);
    };

    /**
     * When the user picks a frequency from the dropdown, set its event (forced by the use of eventkey in the component)
     * to the timeUnit portion of the component's state.
     * @param event the unit of time the user wishes to use
     */
    handleFrequencyDropdownSelect = (event) => {
        this.setState({frequency: event},  null);
    };

    /**
     * Set the search type to the text in the incoming event.
     * @param event
     */
    handleSearchTypeSelect = (event) => {
        this.setState({searchType: event},  null);
    };

    /**
     * Verifies that input that the put in to search for subreddits is correct.
     * @returns {boolean} true if the input is valid, false otherwise.
     */
    validateSubredditSearchInput = () => {
        this.setState({findSubredditsButtonPressed: true});
        let isValidInput = true;
        if (this.state.searchTerm === '' || this.state.searchTerm === undefined) {
            isValidInput = false;
        }
        else if (this.state.timeUnit === 'Select Time Unit' || this.state.timeUnit === '' || this.state.timeUnit === undefined) {
            isValidInput = false;
        }
        else if (this.state.frequency === 'Select Sample Frequency' || this.state.frequency ==='' || this.state.frequency === undefined) {
            isValidInput = false;
        }
        return isValidInput;
    };

    /**
     * Calls out to the service layer to retrieve all subreddits in which this search term appears.
     * @param searchTerm
     * @param frequency
     * @param timeFrame
     */
    getPossibleSubredditsForSearchTerm = async (event) => {
        this.setState({findSubredditsButtonPressed: true}, null);
        if(this.validateSubredditSearchInput()) {
            const searchTerm = this.state.searchTerm;
            const frequency = this.frequency;
            const timeFrame = this.state.timeNum + this.state.timeUnit;
            const searchType = this.state.searchType;
            this.setState({validationError: false}, null);
            let res = await getSubRedditsForSearchTerm(searchTerm, frequency, timeFrame, searchType);
            this.setState({showSubreddits: true,
                subredditsList: res.data.aggs.subreddit}, null);
            return res.data.aggs.subreddit;
        } else {
            this.setState({validationError: true}, null);
        }
    };



    generateSearchTypeOptions = () => {
        let items = [];
        for (let i = 0; i <= this.searchTypes.length; i++) {
            items.push(<DropdownItem key={i} eventKey={this.searchTypes[i]} value={this.searchTypes[i]}>{this.searchTypes[i]}</DropdownItem>);
        }
        return items;
    };

    /**
     * Generates the possible options for units of time to choose from.
     */
    generateTimeOptions = () => {
        const frequency_keys = ['h', 'd', 'w', 'm', 'y'];
        let items = [];
        for (let i = 0; i <= this.frequency_options.length; i++) {
            items.push(<DropdownItem key={i} eventKey={frequency_keys[i]} value={this.frequency_options[i]}>{this.frequency_options[i]}</DropdownItem>);
        }
        return items;
    };

    /**
     * Generates the possible options for frequency to choose from.
     */
    generateFrequencyOptions = () => {
        let items = [];
        for (let i = 0; i <= this.frequency_options.length; i++) {
            items.push(<DropdownItem key={i} eventKey={this.frequency_options[i]} value={this.frequency_options[i]}>{this.frequency_options[i]}</DropdownItem>);
        }
        return items;
    };

    renderSubredditsList = () => {
        if (this.state.findSubredditsButtonPressed && this.state.showSubreddits) {
            const subreddits = this.state.subredditsList;
            return <GetSentimentForm subreddits={subreddits} searchTerm={this.state.searchTerm} searchType={this.state.searchType}/>
        }
        else if (this.state.validationError) {
            return (
                <Card bg="danger" text="white" style={{ width: '42rem' }}>
                    <Card.Body>
                        <Card.Text>
                            Please select valid entries for the frequency, search term, and unit of time.
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        }
        else if (this.state.findSubredditsButtonPressed && !this.state.showSubreddits) {
            // Show an error if it shouldnt show the subreddits due to validation error.
            return (
            <Card bg="info" text="white" style={{ width: '42rem' }}>
                <Card.Body>
                    <Card.Text>
                        Searching for subreddits...
                    </Card.Text>
                    <Loader type="ThreeDots" color="white" height={75} width={75} />
                </Card.Body>
            </Card>
            );
        }
        else {
            // Don't render anything since we haven't been pressed.
            return null;
        }

    };


    /**
     * Render the HTML components.
     */
    render() {
        return(
            <div>
                <Form style={{marginLeft: '100px', marginRight: '100px', marginBottom: '20px', width: '40rem'}}>
                    <Form.Group as={Row} controlId="searchTermWrapper">
                        <Form.Label column sm={3} style={{textAlign: 'left'}}>
                            Search Term
                        </Form.Label>
                        <Col sm={9}>
                            <FormControl type="search" id="searchTerm" placeholder="Trump, vegans, etc." onChange={this.handleOnChange}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="searchType">
                        <Form.Label column sm={3} style={{textAlign: 'left'}}>
                            Search Type
                        </Form.Label>
                        <Col lg={9}>
                            <Row>
                                <Col>
                                    <DropdownButton id="searchTypeSelect" onSelect={this.handleSearchTypeSelect} title={this.state.searchType}>
                                        {this.generateSearchTypeOptions()}
                                    </DropdownButton>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="timeFrame">
                        <Form.Label column sm={3} style={{textAlign: 'left'}}>
                            Time Frame
                        </Form.Label>
                        <Col sm={9}>
                            <Row>
                                <Col sm={4}>
                                    <FormControl type="number" id="timeNum" placeholder="5,6,7,8 etc." onChange={this.handleOnChange}/>
                                </Col>
                                <Col sm={5}>
                                    <DropdownButton id="timeUnit" onSelect={this.handleTimeDropdownSelect} title={this.state.timeUnit}>
                                        {this.generateTimeOptions()}
                                    </DropdownButton>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="frequencyControl">
                        <Form.Label column sm={3} style={{textAlign: 'left'}}>
                            Sample Frequency
                        </Form.Label>
                        <Col lg={9}>
                            <Row>
                                <Col>
                                    <DropdownButton id="frequencySelect" onSelect={this.handleFrequencyDropdownSelect} title={this.state.frequency}>
                                        {this.generateFrequencyOptions()}
                                    </DropdownButton>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2}}>
                            <Button type="button" id="find-occurrences-buttons" onClick={this.getPossibleSubredditsForSearchTerm}>Find Occurrences</Button>
                        </Col>
                    </Form.Group>
                </Form>
                {this.renderSubredditsList()}
            </div>
    );
    }
}

export default SearchArea;
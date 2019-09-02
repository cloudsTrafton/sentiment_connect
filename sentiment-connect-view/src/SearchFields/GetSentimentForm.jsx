import React from 'react';
import Card from "react-bootstrap/es/Card";
import PropTypes from "prop-types";
import {getSentimentFromSearchTermSubreddit} from "../ServiceCalls/AjaxCalls";
import {Button, DropdownItem, Form} from "react-bootstrap";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import DropdownButton from "react-bootstrap/es/DropdownButton";
import ResultCard from "../SentimentResult/ResultCard";

class GetSentimentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subreddit: 'Select a Subreddit',
            searchTerm: this.props.searchTerm,
            searchType: 'submissions', // TODO set this above
            searchInitiated: false,
            sentimentResults: '',

        };
    }

    arrAvg = (arr) => arr.reduce((a,b) => a + b, 0) / arr.length;

    /**
     * Once the user presses the button, fire off the event to submit to the backend for processing.
     * @param event
     */
    handleNlpDataRequest = async (event) => {
        // TODO
        let isValidInput = true;
        let nlpDataResults = '';
        if (!isValidInput) {
            // TODO show some red outline or something and some kind of message saying the
            // input was bad.
        } else {
            let res = await getSentimentFromSearchTermSubreddit(this.state.subreddit, this.state.searchTerm, this.state.searchType);
            // nlpDataResults = res.data;
            // console.log(nlpDataResults);
            this.setState({sentimentResults: res.data,
                                 searchInitiated: true}, null);
        }
    };

    /**
     * Validate the input form based on requirements. (TODO)
     * @returns {boolean}
     */
    validateInput = () => {
        let isValidInput = true;
        if (this.state.subreddit === 'Select a Subreddit' || this.state.subreddit === undefined) {
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
        const subredditListLength = subredditList.length;
        const displayLimit = 20;
        const subredditLimit = (subredditListLength > displayLimit) ? displayLimit : subredditListLength;
        for (let i = 0; i < subredditLimit; i++) {
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

    aggregateSentimentData = (data) => {
        let positiveConfidence = [], negativeConfidence = [], negativeCount = 0, positiveCount = 0;
        for (let i = 0; i < data.length; i++) {
            let value = data[i];
            positiveConfidence.push(value.positiveConfidenceAvg);
            negativeConfidence.push(value.negativeConfidenceAvg);
            negativeCount += value.negativeMentionCount;
            positiveCount += value.positiveMentionCount;
            // sentimentComponents.push(<ResultCard negativeConfidence={value.negativeConfidenceAvg}
            //                                      negativeMentionCount={value.negativeMentionCount}
            //                                      positiveConfidence={value.positiveConfidenceAvg}
            //                                      positiveMentionCount={value.positiveMentionCount}
            //                                      mentionType={value.entityType} topic={value.entityName}
            //                                     subreddit={value.subreddit}/>)
            console.log(value);
        }
        return {positiveConfidenceAvg: this.arrAvg(positiveConfidence),
                negativeConfidenceAvg: this.arrAvg(negativeConfidence),
                positiveCount: positiveCount,
                negativeCount: negativeCount}
    }
    renderSentimentData = () => {
        console.log("render sentiment data!");
        const results = this.state.sentimentResults;
        const topic = this.state.searchTerm;
        const subreddit = this.state.subreddit;
        if (results !== '' && this.state.searchInitiated) {
            // let sentimentComponents = [];
            const aggregatedResults = this.aggregateSentimentData(results);
            return (
                <div style={{marginTop: '1rem'}}>
                    <ResultCard negativeConfidence={aggregatedResults.negativeConfidenceAvg}
                                negativeMentionCount={aggregatedResults.negativeCount}
                                positiveConfidence={aggregatedResults.positiveConfidenceAvg}
                                positiveMentionCount={aggregatedResults.positiveCount}
                                topic={topic}
                                subreddit={subreddit}/>
                </div>
            )

        } else if (this.state.searchInitiated && this.state.sentimentResults === '') {
            return (
                <Card bg="info" text="white" style={{ width: '42rem' }}>
                    <Card.Body>
                        <Card.Text>
                            Loading your sentiment data. Please be patient.
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        } else {
            console.log("returning null");
            // If we don't have anything and we are null, then we havent looked yet.
            return null;
        }
    }

    /**
     * Renders the component onLoad.
     */
    render() {
        const subreddits = this.props.subreddits;

        return (
            <div>
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
                                        <Form.Control plaintext readOnly defaultValue={this.props.searchTerm}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="subredditControl">
                                    <Form.Label column sm={3} style={{textAlign: 'left'}}>
                                        Subreddit
                                    </Form.Label>
                                    <Col lg={9}>
                                        <Row>
                                            <Col>
                                                <DropdownButton onSelect={this.handleSubredditDropdownSelect} title={this.state.subreddit}>
                                                    {this.generateSubredditOptions(subreddits)}
                                                </DropdownButton>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Col sm={{ span: 10, offset: 2}}>
                                        <Button type="button" id="find-sentiment-info-buttons" onClick={this.handleNlpDataRequest}>Get Sentiment Information</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
                {this.renderSentimentData()}
            </div>
        );
    }

}



GetSentimentForm.propTypes = {
    subreddits: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired
};


export default GetSentimentForm;
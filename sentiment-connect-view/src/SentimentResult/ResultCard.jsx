import React from 'react';
import PropTypes from 'prop-types';
import ConfidenceGauge from "./ConfidenceGauge";
import Card from "react-bootstrap/es/Card";

class ResultCard extends React.PureComponent {

    render() {
        return (
            <Card>
                <Card.Header as="h5">Sentiment about {this.props.topic} in {this.props.subreddit}</Card.Header>
                <Card.Body>
                    <Card.Title>General Sentiment: {this.props.sentiment}</Card.Title>
                    <ConfidenceGauge percent={50}/>
                </Card.Body>
            </Card>
        );
    }
}

ResultCard.propTypes = {
    confidence: PropTypes.number.isRequired,
    sentiment: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    subreddit: PropTypes.string,

};

export default ResultCard;
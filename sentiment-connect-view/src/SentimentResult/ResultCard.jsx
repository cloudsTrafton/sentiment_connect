import React from 'react';
import PropTypes from 'prop-types';
import ConfidenceGauge from "./ConfidenceGauge";
import Card from "react-bootstrap/es/Card";

class ResultCard extends React.PureComponent {

    render() {
        return (
            <Card style={{marginLeft: '100px', marginRight: '100px'}}>
                <Card.Header as="h5">Sentiment about {this.props.topic} in {this.props.subreddit}</Card.Header>
                <Card.Body>
                    <div style={{alignItems: 'left'}}>
                        <Card.Title>General Sentiment: {this.props.sentiment}</Card.Title>
                        <ConfidenceGauge percent={50}/>
                        <Card.Text>Confidence</Card.Text>
                    </div>
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
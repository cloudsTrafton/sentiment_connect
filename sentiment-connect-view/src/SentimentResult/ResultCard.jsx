import React from 'react';
import PropTypes from 'prop-types';
import ConfidenceGauge from "./ConfidenceGauge";
import Card from "react-bootstrap/es/Card";

class ResultCard extends React.PureComponent {

    getSentimentColor

    render() {

        const positiveConfidence = Math.round(this.props.positiveConfidence * 100);
        const negativeConfidence = Math.round(this.props.negativeConfidence * 100);

        return (
            <Card style={{marginLeft: '100px', marginRight: '100px', marginBottom: '20px'}}>
                <Card.Header as="h5">Sentiment Data for {this.props.topic} in {"r/" + this.props.subreddit}</Card.Header>
                <Card.Body>
                    <div style={{alignItems: 'left'}}>
                        {/*<Card.Title>General Sentiment: {this.props.sentiment}</Card.Title>*/}
                        <ConfidenceGauge percent={positiveConfidence}/>
                        <Card.Text>Positive Confidence</Card.Text>
                        <ConfidenceGauge percent={negativeConfidence}/>
                        <Card.Text>Negative Confidence</Card.Text>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

ResultCard.propTypes = {
    negativeConfidence: PropTypes.number.isRequired,
    negativeMentionCount: PropTypes.number.isRequired,
    positiveConfidence: PropTypes.number.isRequired,
    positiveMentionCount: PropTypes.number.isRequired,
    mentionType: PropTypes.string,
    topic: PropTypes.string.isRequired,
    subreddit: PropTypes.string.isRequired,
};

export default ResultCard;
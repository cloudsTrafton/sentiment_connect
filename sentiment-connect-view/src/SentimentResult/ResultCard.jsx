import React from 'react';
import PropTypes from 'prop-types';
import ConfidenceGauge from "./ConfidenceGauge";
import Card from "react-bootstrap/es/Card";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";

class ResultCard extends React.PureComponent {

    /**
     * Get a different color based on the confidence score. Greener scores are more confident.
     * @return the color to match the sentiment
     */
    getSentimentColor = (confidence) => {
        console.log(confidence);
            if (confidence < 20 && confidence > 0) {
                return "#FF0000";
            }
            else if (confidence === 0) {
                return "#999999";
            }
            else if (confidence < 40) {
                return "#FF9E00";
            }
            else if (confidence < 60) {
                return "#FFFF00";
            }
            else if (confidence < 80) {
                return "#8DFF00";
            }
            else {
                return "#00FF00";
            }
    };

    render() {

        const positiveConfidence = Math.round(this.props.positiveConfidence * 100);
        const negativeConfidence = Math.round(this.props.negativeConfidence * 100);

        return (
            <Card style={{marginLeft: '100px', marginRight: '100px', marginBottom: '20px'}}>
                <Card.Header as="h5">Sentiment Data for {this.props.topic} in {"r/" + this.props.subreddit} by {this.props.searchType + "s"} on {this.props.date} with context {this.props.context}</Card.Header>
                <Card.Body>
                    <div style={{alignItems: 'left'}}>
                        <Row sm={12}>
                            <Col>
                                <ConfidenceGauge percent={positiveConfidence} color={this.getSentimentColor(positiveConfidence)}/>
                                <Card.Text>Positive Confidence</Card.Text>
                                <Card.Text>Positive Mentions: {this.props.positiveMentionCount}</Card.Text>
                            </Col>
                            <Col>
                                <ConfidenceGauge percent={negativeConfidence} color={this.getSentimentColor(negativeConfidence)}/>
                                <Card.Text>Negative Confidence</Card.Text>
                                <Card.Text>Negative Mentions: {this.props.negativeMentionCount}</Card.Text>
                            </Col>
                        </Row>
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
    searchType: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    context: PropTypes.string.isRequired,
};

export default ResultCard;
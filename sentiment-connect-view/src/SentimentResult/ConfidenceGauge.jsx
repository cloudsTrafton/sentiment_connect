import React from 'react';
import PropTypes from 'prop-types';
import SimpleReactGauge from "../GenericComponents/SimpleReactGauge";


/**
 * Component that represents the confidence score.
 */
class ConfidenceGauge extends React.PureComponent {

    render() {
        return (
            <SimpleReactGauge percent={this.props.percent} color={this.props.color} halfCircle={true} animate={true} maxWidth={200}/>
        );
    }

}

ConfidenceGauge.propTypes = {
    percent: PropTypes.number.isRequired,
    // animate: PropTypes.bool,
    // bgcolor: PropTypes.string,
    color: PropTypes.string,
    // halfCircle: PropTypes.bool,
    // lineWidthPercent: PropTypes.number,
    // maxWidth: PropTypes.number,
    // startPercent: PropTypes.number,
    // label: PropTypes.string,
    // textColor: PropTypes.string
};

export default ConfidenceGauge;



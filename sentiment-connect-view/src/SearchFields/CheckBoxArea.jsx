import React from 'react';
import {Form, Button} from 'react-bootstrap'
import PropTypes from 'prop-types';
import SearchArea from "./SearchArea";
import ResultCard from "../SentimentResult/ResultCard";

/**
 * Generic wrapper for a checkbox.
 */
class CheckBoxArea extends React.PureComponent {

    render() {
        return (
            <fieldset>

            </fieldset>
        );

    }

}

CheckBoxArea.propTypes = {
    controlId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default CheckBoxArea;
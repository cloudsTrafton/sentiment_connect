import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Simple React Gauge. Source is:
 *
 * https://github.com/gmanfredi/simple-canvas-react-gauge
 */
class SimpleReactGauge extends Component {

    /**
     * starts the display percent and get things going
     */
    componentDidMount() {
        this.displayPercent = this.props.startPercent;
        this.resizeHandler = this.handleResize.bind(this);
        window.addEventListener('resize', this.resizeHandler);
        this.buildGauge();
    }

    /**
     * rebuilds the guage completely as Canvas is not reactive to state changes
     */
    componentDidUpdate() {
        this.buildGauge();
    }

    /**
     * cleans up
     */
    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler);
    }

    /**
     * (re)builds the gauge according to curent size and starts animation if needed
     */
    buildGauge() {
        this.setGaugeSizeToCanvas();
        this.drawGauge();
        if (this.props.animate) this.startAnimation();
    }

    /**
     * initiates the animation with setInterval
     */
    startAnimation() {
        if (this.animationLoop) clearInterval(this.animationLoop);
        this.animationLoop = setInterval(() => {
            this.stepAnimate();
        }, 5);
    }

    /**
     * will animate the gauge the next step towards the desired percent
     */
    stepAnimate() {
        const { percent } = this.props;
        if (this.displayPercent === percent) clearInterval(this.animationLoop);
        if (this.displayPercent < percent) this.displayPercent++;
        else if (this.displayPercent > percent) this.displayPercent--;
        this.drawGauge();
    }

    /**
     * will resize the gauge to new canvas size if needed
     */
    handleResize() {
        const { maxWidth } = this.props;
        const gaugeDiv = this.refs.gaugeDiv;
        const newWidth = maxWidth ? Math.min(gaugeDiv.clientWidth, maxWidth) : gaugeDiv.clientWidth;
        if (newWidth !== this.width) {
            this.setGaugeSizeToCanvas();
            this.drawGauge();
        }
    }

    /**
     * sets up the size variables for canvas drawing
     */
    setGaugeSizeToCanvas() {
        const { halfCircle, lineWidthPercent, maxWidth } = this.props;
        const canvasDiv = this.refs.gaugeDiv;
        const canvas = this.refs.gauge;
        this.width = maxWidth ? Math.min(canvasDiv.clientWidth, maxWidth) : canvasDiv.clientWidth;
        this.height = halfCircle ? this.width / 2 : this.width;
        canvas.width = this.width;
        canvas.height = this.height;
        this.lineWidth = Math.round(lineWidthPercent / 100 * this.width);
        const fontSizeMultiplier = halfCircle ? 0.15 : 0.20;
        this.fontSize = Math.max(13, Math.round(this.width * fontSizeMultiplier));
        this.radius = this.width / 2 - (this.lineWidth / 2);
        this.center = {
            x: this.width / 2,
            y: halfCircle ? this.height : this.height / 2
        };
        this.ctx = this.refs.gauge.getContext('2d');
    }

    /**
     * is the main method for drawing the gauge according to this.displayPercent
     */
    drawGauge() {
        const { bgcolor, color, animate, percent } = this.props;
        if (!animate) this.displayPercent = percent;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawArc(100, bgcolor);
        this.drawArc(this.displayPercent, color);
        this.drawText(this.displayPercent);
    }

    /**
     * draws the arc according to given percent and color
     * @param {integer} percent
     * @param {string} color
     */
    drawArc(percent, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.arc(
            this.center.x,
            this.center.y,
            this.radius,
            this.toRadians(0),
            this.toRadians(percent),
            false);
        this.ctx.stroke();
    }

    /**
     * draws the percent text to the given percent
     * @param {integer} percent
     */
    drawText(percent) {
        const { textColor, halfCircle, label } = this.props;
        const text = `${percent}%`;
        this.ctx.fillStyle = textColor;
        this.ctx.font = `${this.fontSize}px arial`;
        const textWidth = this.ctx.measureText(text).width;
        const x = this.center.x - textWidth / 2;
        let y = this.center.y + (halfCircle ? -5 : this.fontSize / 2);
        // account for label if given
        if (label) y -= this.fontSize * 0.7;
        this.ctx.fillText(text, x, y);
        if (label) this.drawLabel(label, y);
    }

    /**
     * draws the optional label below the percent display
     * @param {string} label is the option text below the display percent
     * @param {integer} y is the offset from the percent text
     */
    drawLabel(label, y) {
        const subTextSize = this.fontSize * 0.6;
        this.ctx.font = `${subTextSize}px arial`;
        this.ctx.fillText(label, this.center.x - subTextSize * 2.2, y + subTextSize);
    }

    /**
     * converts percent to radians.  Radians are calculated from 270 degrees as 0 percent for half circle
     * For full circle, calculate from 0 degrees.
     * @param {integer} percent
     */
    toRadians(percent) {
        let degrees;
        let radians;
        if (this.props.halfCircle) {
            degrees = Math.round(percent / 100 * 180);
            radians = (degrees - 180) * Math.PI / 180;
        } else {
            degrees = Math.round(percent / 100 * 360);
            radians = (degrees - 90) * Math.PI / 180;
        }
        return radians;
    }

    render() {
        return <div ref="gaugeDiv"><canvas ref="gauge" /></div>;
    }
}

SimpleReactGauge.propTypes = {
    percent: PropTypes.number.isRequired,
    animate: PropTypes.bool,
    bgcolor: PropTypes.string,
    color: PropTypes.string,
    halfCircle: PropTypes.bool,
    lineWidthPercent: PropTypes.number,
    maxWidth: PropTypes.number,
    startPercent: PropTypes.number,
    label: PropTypes.string,
    textColor: PropTypes.string
};

SimpleReactGauge.defaultProps = {
    animate: false,
    bgcolor: '#e6e6e6',
    color: '#c80000',
    halfCircle: false,
    lineWidthPercent: 18,
    startPercent: 0,
    textColor: '#000'
};

export default SimpleReactGauge;
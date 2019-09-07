import React from 'react';
import Card from "react-bootstrap/es/Card";
import Navbar from "../Navigation/navbar";
import Image from "react-bootstrap/es/Image";
import logo from  '../sc_logo.png'

class Header extends React.Component {


    render() {
        return (
            <Card style={{width: '100%', display: 'inline-block', alignContent: 'center'}}>
                <Card.Header style={{padding: '10px', backgroundColor: 'white'}}>
                    <Image src={logo}/>
                    <h6>Real time Sentiment Analysis from Reddit</h6>
                    <Navbar/>
                </Card.Header>
            </Card>
        );
    }
}

export default Header;
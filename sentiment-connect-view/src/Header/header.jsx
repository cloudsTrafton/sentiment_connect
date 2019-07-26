import React from 'react';
import Card from "react-bootstrap/es/Card";
import Navbar from "../Navigation/navbar";

class Header extends React.Component {


    render() {
        return (
            <Card>
                <Card.Header>
                    Sentiment Connect
                    <Navbar/>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Discover how the internet feels!</Card.Title>
                    <Card.Text>
                        Get insights on stuffs and things!!
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default Header;
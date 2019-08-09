import React from 'react';
import Nav from "react-bootstrap/es/Nav";

class Navbar extends React.PureComponent {

    render() {
        return (
        <Nav
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}>
            <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="dashboard-link">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">About</Nav.Link>
            </Nav.Item>
        </Nav>
        );
    }

}

export default Navbar;
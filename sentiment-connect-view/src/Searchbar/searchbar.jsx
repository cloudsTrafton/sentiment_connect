import React from 'react';
import {Form, Button} from 'react-bootstrap'

class Searchbar extends React.Component {

    render() {
        return(
                <Form style={{marginLeft: '300px', width: '25rem'}}>
                    <Form.Group controlId="formSearchTerm">
                        <Form.Label>Search Term</Form.Label>
                        <Form.Control type="email" placeholder="Enter a search term" />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                            <Form.Text className="text-muted">
                                Trump, Veganism, Bob Ross, etc.
                            </Form.Text>
                    </Form.Group>
                </Form>

    );
    }
}

export default Searchbar;
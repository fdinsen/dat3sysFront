import React, {useState, useEffect} from 'react';
import { Col, Container, Row, ListGroup, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function SearchList(props) {
    const [list, setList] = useState([]);
    
    useEffect(() =>{
        if(props.results) {
            setList(props.results);
        }
    })

    function handleClick(event) {
        event.target.id ? props.updateId(event.target.id) : console.log("dunt klik de img");
    }

    return (
        <>
            <Container className="mt-4">
                <Col>
                    <Card>
                        <ListGroup onClick={handleClick}>
                            <BuildList list={list}/>
                        </ListGroup>
                    </Card>
                </Col>
            </Container>
        </>
    );
}

function BuildList(props) {
    return props.list.map(elem => {
        return (
        <ListGroup.Item action key={elem.id} id={elem.id} >
            <img src={elem.profilePicUrl} width="40pt" className="mr-4"/>
            {elem.name}
        </ListGroup.Item>);
    })
}
export default SearchList;

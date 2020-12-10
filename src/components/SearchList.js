import React, {useState, useEffect} from 'react';
import { Col, Container, Row, ListGroup, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import yt from "../img/yt.png"
import twitch from "../img/twitch.png"

function SearchList(props) {
    const [list, setList] = useState([]);
    
    useEffect(() =>{
        if(props.results) {
            setList(props.results);
        }
    })

    function handleClick(event) {
        event.target.id ? props.updateId(event.target.id, event.target.value) : console.log("dunt klik de img");
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
        let serviceImg = yt;
        let size = "40pt";
        let padding = "mr-1 pt-1";
        if(elem.service == 'twitch') {
            serviceImg = twitch;
            size = "30pt";
            padding = "mr-2 pt-1";
        }

        return (
        <ListGroup.Item action key={elem.id} id={elem.id} value={elem.service}>
            <img src={elem.profilePicUrl} width="40pt" className="mr-4"/>
            {elem.name}
            <img variant="top" src={serviceImg} width={size} className={padding} style={{float: 'right'}}/>
        </ListGroup.Item>);
    })
}
export default SearchList;

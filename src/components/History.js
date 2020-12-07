import React, { useState, useEffect } from 'react';
import { Col, Container, Row, ListGroup, Card, Button, Alert, ButtonGroup, Accordion } from 'react-bootstrap';
import facade from "../apiFacade";
import SingleHistory from './SingleHistory';
import SingleTimelineHistory from './SingleTimelineHistory';

function History(props) {

    const [arrays, setArrays] = useState(null);
    const [errorMes, setErrorMes] = useState("");
    const [views, setViews] = useState([])
    const [followers, setFollowers] = useState([])
    const [games, setGames] = useState([]);
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        console.log("her er "+followers)
        const endpoint = `/${props.channel.service}/get-analytics/${props.channel.id}`
        
        if (arrays === null) {
            facade.fetchData(endpoint, "GET").then(data => {
                setArrays(data);

            }).catch((err) => {
                setErrorMes("something went wrong")
            })
        }else{
            handleData(arrays, setViews, setFollowers, setGames, setHasData);
            
        }

    }, arrays)

    const array = [
        ["Dec 4, 2020 11:10:46 am", "Minecraft"],
        ["2020-02-25", "Minecraft"],
        ["2017-03-18", "Lol"],
        ["2018-04-20", "Minecraft"],
        ["2019-03-06", "Minecraft"],
        ["2020-10-19", "Lol"],
        ["2017-11-19", "Minecraft"],
        ["2018-01-29", "Minecraft"],
        ["2019-08-06", "Minecraft"],
        ["2019-06-13", "overwatch"]
    ]

    return (

        <>
            {hasData ?
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                {props.channel.service === "youtube" ? "Views" : "Views"}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body><SingleHistory ar={views} /></Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                {props.channel.service === "youtube" ? "Subscribers" : "Followers"}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body><SingleHistory ar={followers} /></Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                {props.channel.service === "youtube" ? "Video count" : "Game"}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body><SingleTimelineHistory ar={games} /></Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    <Button onClick={(e) => props.showAnalytics(false)}>Back</Button>

                </Accordion>
                :
                (<span id="spinner" class="spinner-border spinner-border-sm mr-1" role="status"></span>)}

            {views}
        </>
    )
}

function handleData(data, setViews, setFollowers, setGames, setHasData) {

    let views = [];
    let followers = [];
    let games = [];
    data.forEach((element, index, data) => {
        console.log(element);
        views.push([element.savedOnDate, element.views]);
        followers.push([element.savedOnDate, element.followers]);
        games.push([element.game, element.savedOnDate, data[index++].savedOnDate]);
    });
    setViews(views);
    setFollowers(followers);
    setGames(games);
    

    setHasData(true);
}

export default History;
import React, { useState, useEffect } from 'react';
import { Col, Container, Row, ListGroup, Card, Button, Alert, ButtonGroup, Accordion } from 'react-bootstrap';
import facade from "../apiFacade";
import SingleHistory from './SingleHistory';
import SingleTimelineHistory from './SingleTimelineHistory';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function History(props) {

    const [arrays, setArrays] = useState(null);
    const [views, setViews] = useState([])
    const [followers, setFollowers] = useState([])
    const [games, setGames] = useState([]);
    const [hasData, setHasData] = useState(false);
    const [videoCount, setVideoCount] = useState([]);

    useEffect(() => {
        const endpoint = `/${props.channel.service}/get-analytics/${props.channel.id}`

        if (arrays === null) {
            facade.fetchData(endpoint, "GET").then(data => {
                setArrays(data);

            }).catch((err) => {
                toast.error('🦄 Wow so easy!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        } else {
            if (props.channel.service === "youtube") {
                handleData(arrays, setViews, setFollowers, setGames, setVideoCount, setHasData, "youtube");
            } else if (props.channel.service === "twitch") {
                handleData(arrays, setViews, setFollowers, setGames, setVideoCount, setHasData, "twitch");
            }
        }

    }, arrays)

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
                            {props.channel.service === "youtube" ? (
                                <Card.Body><SingleHistory ar={videoCount} /></Card.Body>
                            ) : (
                                    <Card.Body><SingleTimelineHistory ar={games} /></Card.Body>
                                )}

                        </Accordion.Collapse>
                    </Card>

                    <Button onClick={(e) => props.showAnalytics(false)}>Back</Button>

                </Accordion>
                :
                (<span id="spinner" class="spinner-border spinner-border-sm mr-1" role="status"></span>)}

        </>
    )
}

function handleData(data, setViews, setFollowers, setGames, setVideoCount, setHasData, service) {

    let views = [];
    let followers = [];
    let videoCount = [];
    let games = [];
    let newIndex = 0;

    data.forEach((element, index, data) => {

        newIndex++;

        views.push([element.savedOnDate, element.views]);

        if (service === "youtube") {

            videoCount.push([element.savedOnDate, element.videoCount]);
            followers.push([element.savedOnDate, element.subscribers]);

        } else if (service === "twitch") {

            followers.push([element.savedOnDate, element.followers]);

            if (index >= data.length - 1) {
                games.push([element.game, element.savedOnDate, element.savedOnDate]);
            } else {
                games.push([element.game, element.savedOnDate, data[newIndex].savedOnDate]);
            }

        }
    });

    setVideoCount(videoCount);
    setViews(views);
    setFollowers(followers);
    setGames(games);

    setHasData(true);
}

export default History;
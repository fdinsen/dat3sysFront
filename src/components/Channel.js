import React, { useState, useEffect } from 'react';
import { Col, Container, Row, ListGroup, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import facade from "../apiFacade";
import yt from "../img/yt.png"
import twitch from "../img/twitch.png"

function Channel(props) {
    const [data, setData] = useState(null);
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        const endpoint = `/${props.channel.service}/channel/${props.channel.id}`
        facade.fetchData(endpoint, "GET").then(data => {
            setData(data);
            setHasData(true);
        })
    }, [])

    return (
        <>
            <Container className="mt-4 mb-4">
                <Col className="d-flex justify-content-center">
                    {hasData ?
                        (<ChannelInfo channel={props.channel} data={data} />) :
                        (<span id="spinner" class="spinner-border spinner-border-sm mr-1" role="status"></span>)
                    }
                </Col>
            </Container>
        </>
    );
}
export default Channel;

function ChannelInfo(props) {
    if (props.channel.service == "youtube") {
        return <YouTubeInfo data={props.data} channelId={props.channel.id} />
    } else if (props.channel.service == "twitch") {
        return <Twitchinfo data={props.data} />
    } else {
        return <p>Error, no service by name {props.channel.service}</p>
    }
}

function YouTubeInfo(props) {
    return (
        <Card style={{ width: '40rem' }}>
            <Card.Header>
                <h4 style={{ 'float': 'left' }}>{props.data.title}</h4>
                <a href={`https://www.youtube.com/channel/${props.channelId}`} target="_blank">
                    <img src={yt} width="60pt" style={{ 'float': 'right' }}></img>
                </a>
            </Card.Header>
            <Card.Img variant="top" src={props.data.profilePicURL} />
            <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Card.Text>{props.data.desc}</Card.Text>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Card.Text>Country: {props.data.country}</Card.Text>
                        <Card.Text>Subscribers: {props.data.subscribers}</Card.Text>
                        <Card.Text>Views: {props.data.views}</Card.Text>
                        <Card.Text>Videos: {props.data.videoCount}</Card.Text>
                        <Card.Text>Topics: <ul>{props.data.topicCategories.map(elem => {
                            return (<li>{elem}</li>)
                        })}</ul></Card.Text>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>);
}

function Twitchinfo(props) {
    let isPartner = "";
    if (props.data.partner) {
        isPartner = "Yes";
    } else {
        isPartner = "No";
    }
    return (
        <Card style={{ width: '40rem' }}>
            <Card.Header>
                <h4 style={{ 'float': 'left' }}>{props.data.title}</h4>
                <a href={`https://www.twitch.tv/${props.data.title}`} target="_blank">
                    <img src={twitch} width="35pt" style={{ 'float': 'right' }}></img>
                </a>
            </Card.Header>
            <Card.Img variant="top" src={props.data.profilePicUrl} />
            <Card.Body>
                <Card.Text>{props.data.desc}</Card.Text>
                <Card.Text>Is partner?: {isPartner}</Card.Text>
                <Card.Text>Country: {props.data.country}</Card.Text>
                <Card.Text>Game: {props.data.game}</Card.Text>
                <Card.Text>Views: {props.data.views}</Card.Text>
                <Card.Text>Followers: {props.data.followers}</Card.Text>
            </Card.Body>
        </Card>);
}
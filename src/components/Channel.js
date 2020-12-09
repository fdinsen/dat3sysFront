import React, { useState, useEffect } from 'react';
import {
  Col,
  Container,
  Row,
  ListGroup,
  Card,
  Button,
  Alert,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import facade from '../apiFacade';
import yt from '../img/yt.png';
import twitch from '../img/twitch.png';
import Hisotry from './History';
import SaveAsFavorite from './Favorites/SaveAsFavorite';

function Channel(props) {
  const [data, setData] = useState(null);
  const [hasData, setHasData] = useState(false);
  const [errorMes, setErrorMes] = useState('');
  const [analytics, showAnalytics] = useState(false);

  useEffect(() => {
    const endpoint = `/${props.channel.service}/channel/${props.channel.id}`;
    facade.fetchData(endpoint, 'GET').then((data) => {
      setData(data);
      setHasData(true);
    });
  }, []);

  return (
    <>
      {analytics ? (
        <Hisotry
          channel={props.channel}
          data={data}
          analytics={analytics}
          showAnalytics={showAnalytics}
        />
      ) : (
        <Container className="mt-4 mb-4">
          <Col className="d-flex justify-content-center">
            {hasData ? (
              <ChannelInfo
                channel={props.channel}
                data={data}
                errorMes={errorMes}
                setErrorMes={setErrorMes}
                analytics={analytics}
                showAnalytics={showAnalytics}
              />
            ) : (
              <span
                id="spinner"
                class="spinner-border spinner-border-sm mr-1"
                role="status"></span>
            )}
          </Col>
        </Container>
      )}
    </>
  );
}
export default Channel;

function ChannelInfo(props) {
  if (props.channel.service == 'youtube') {
    return (
      <YouTubeInfo
        data={props.data}
        channelId={props.channel.id}
        errorMes={props.errorMes}
        setErrorMes={props.setErrorMes}
        analytics={props.analytics}
        showAnalytics={props.showAnalytics}
      />
    );
  } else if (props.channel.service == 'twitch') {
    return (
      <Twitchinfo
        channelId={props.channel.id}
        data={props.data}
        errorMes={props.errorMes}
        setErrorMes={props.setErrorMes}
        analytics={props.analytics}
        showAnalytics={props.showAnalytics}
      />
    );
  } else {
    return (
      <p>
        Error, no service by name
        {props.channel.service}
      </p>
    );
  }
}

function YouTubeInfo(props) {
  getFaviconEl().href = props.data.profilePicURL;
  getTitleEl().innerHTML = props.data.title + ' | Googol Search';
  return (
    <Card style={{ width: '40rem' }}>
      <Card.Header>
        <h4 style={{ float: 'left' }}>{props.data.title}</h4>
        <SaveAsFavorite service={'youtube'} channelId={props.channelId} />
        <a
          href={`https://www.youtube.com/channel/${props.channelId}`}
          target="_blank">
          <img src={yt} width="60pt" style={{ float: 'right' }}></img>
        </a>
      </Card.Header>
      <a
        href={`https://www.youtube.com/channel/${props.channelId}`}
        target="_blank">
        <Card.Img variant="top" src={props.data.profilePicURL} />
      </a>
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
            <Card.Text>
              Topics:{' '}
              <ul>
                {props.data.topicCategories.map((elem) => {
                  return <li>{elem}</li>;
                })}
              </ul>
            </Card.Text>
            <Row>
              <Col>
                <Button
                  onClick={(e) =>
                    saveYoutube(
                      props.data,
                      e,
                      props.setErrorMes,
                      props.channelId
                    )
                  }>
                  Capture analytics
                </Button>
              </Col>
              <Col>
                <Button onClick={(e) => props.showAnalytics(true)}>
                  Show History
                </Button>
              </Col>
            </Row>
            <p>{props.errorMes}</p>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

function Twitchinfo(props) {
  getFaviconEl().href = props.data.profilePicUrl;
  getTitleEl().innerHTML = props.data.title + ' | Googol Search';
  let isPartner = '';
  if (props.data.partner) {
    isPartner = 'Yes';
  } else {
    isPartner = 'No';
  }
  return (
    <Card style={{ width: '40rem' }}>
      <Card.Header>
        <h4 style={{ float: 'left' }}>{props.data.title}</h4>
        <SaveAsFavorite service={'twitch'} channelId={props.channelId} />
        <a href={`https://www.twitch.tv/${props.data.title}`} target="_blank">
          <img
            src={twitch}
            width="35pt"
            style={{ float: 'right' }}
            className="mr-2"></img>
        </a>
      </Card.Header>
      <a href={`https://www.twitch.tv/${props.data.title}`} target="_blank">
        <Card.Img variant="top" src={props.data.profilePicUrl} />
      </a>
      <Card.Body>
        <Card.Text>{props.data.desc}</Card.Text>
        <Card.Text>Is partner?: {isPartner}</Card.Text>
        <Card.Text>Country: {props.data.country}</Card.Text>
        <Card.Text>Game: {props.data.game}</Card.Text>
        <Card.Text>Views: {props.data.views}</Card.Text>
        <Card.Text>Followers: {props.data.followers}</Card.Text>
        <Row>
          <Col>
            <Button
              onClick={(e) =>
                saveTwitch(props.data, e, props.setErrorMes, props.channelId)
              }>
              Capture analytics
            </Button>
          </Col>
          <Col>
            <Button onClick={(e) => props.showAnalytics(true)}>
              Show History
            </Button>
          </Col>
        </Row>
        <p>{props.errorMes}</p>
      </Card.Body>
    </Card>
  );
}

function saveTwitch(data, e, setErrorMes, channelId) {
  const endpoint = '/twitch/save/' + channelId;

  facade
    .putData(endpoint, 'GET')
    .then((dat) => {
      setErrorMes('Data point succesfully saved');
    })
    .catch((err) => {
      if (err.status == 409) {
        setErrorMes(
          'Analytics was allready saved for this channel within the last minuite'
        );
      } else {
        setErrorMes('Something else went wrong');
      }
    });
}

function saveYoutube(data, e, setErrorMes, channelId) {
  const endpoint = '/youtube/save/' + channelId;

  facade
    .putData(endpoint, 'GET')
    .then((dat) => {
      setErrorMes('Data point succesfully saved');
    })
    .catch((err) => {
      if (err.status == 409) {
        setErrorMes(
          'Analytics was allready saved for this channel within the last minuite'
        );
      } else {
        setErrorMes('Something else went wrong');
      }
    });
}

function getFaviconEl() {
  return document.getElementById('favicon');
}

function getTitleEl() {
  return document.getElementById('title');
}

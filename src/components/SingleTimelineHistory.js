import React, { useState, useEffect, Item } from 'react';
import { Col, Container, Row, ListGroup, Card, Button, Alert } from 'react-bootstrap';
import { Collapse, CardBody } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import facade from "../apiFacade";
import yt from "../img/yt.png"
import twitch from "../img/twitch.png"
import Hisotry from "./History"
import Chartkick, { LineChart, PieChart, Timeline } from 'react-chartkick'
import 'chart.js'

function SingleTimelineHistory(props) {

    const [ar, setAr] = useState([]);

    useEffect(() => {
        setAr(props.ar)
    }, []);

    return (
        <>
            <div>
                <Timeline data={ar} />
            </div>
        </>
    )

}
export default SingleTimelineHistory;
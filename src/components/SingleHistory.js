import React, { useState, useEffect, Item } from 'react';
import { Col, Container, Row, ListGroup, Card, Button, Alert } from 'react-bootstrap';
import { Collapse, CardBody } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import facade from "../apiFacade";
import yt from "../img/yt.png"
import twitch from "../img/twitch.png"
import Hisotry from "./History"
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'

function SingleHistory(props) {

    const [ar, setAr] = useState([]);

    useEffect(() => {
        setAr(props.ar)
    }, []);

    return (
        <>
            <div>
                <LineChart key={Math.random} xtitle="Date" ytitle="Amount" data={ar} />
            </div>
        </>
    )

}
export default SingleHistory;
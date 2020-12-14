import React, { useState } from 'react';
import { Col, Container, FormControl, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import googol from "../img/googol.png";
import facade from "../apiFacade";

function Search(props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [hideSpinner, setHideSpinner] = useState(true);

    function handleQueryChange(event) {
        const query = event.target.value;
        setSearchQuery(query);
    }

    function handleSubmit(event) {
        event.preventDefault();

        //Currently the backend doesn't respond to queries with spaces, 
        // so this replace function is a temporary workaround
        const endpoint = `/youtube/search/`;
        setSearchQuery(searchQuery.replace(/ /g,''));
        search(searchQuery.replace(/ /g,''));
    }

    function search(query) {
        const ytendpoint = `/youtube/search/${query}`;
        const twitchendpoint = `/twitch/search/${query}`;
        setHideSpinner(false);
        facade.fetchData(ytendpoint, "GET").then(data => {
            props.update(data.all, 'youtube');
            setHideSpinner(true);
        })
        facade.fetchData(twitchendpoint, "GET").then(data => {
            props.update(data.all, 'twitch');
            setHideSpinner(true);
        })
    }

    return (
        <>
            <Container>
                <Col className="d-flex justify-content-center mt-5">
                    <div>
                        <img className="img-fluid" src={googol}></img>
                        <div>
                            <form className="form-actions" style={{'text-align': 'center'}} onSubmit={handleSubmit}>
                                <input className="form-control mt-2" placeholder="Enter the name of a channel" value={searchQuery} onChange={handleQueryChange}/>
                                <Button type="submit" className="mt-4">
                                <span id="spinner" class="spinner-border spinner-border-sm mr-1" role="status" hidden={hideSpinner}></span>
                                    Googol Search
                                </Button>
                            </form>
                        </div>
                    </div>
                </Col>
            </Container>
        </>
    );
}
export default Search;

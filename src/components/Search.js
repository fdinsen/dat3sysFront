import React, { useState } from 'react';
import { Col, Container, FormControl, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import googol from "../img/googol.png"
import facade from "../apiFacade";

function Search(props) {
    const [service, setService] = useState("youtube");
    const [searchQuery, setSearchQuery] = useState("");
    const [hideSpinner, setHideSpinner] = useState(true);

    function handleServiceChange(event) {
        if (event.target.checked == true) {
            setService(event.target.value);
        }
    }

    function handleQueryChange(event) {
        const query = event.target.value;
        setSearchQuery(query);
    }

    function handleSubmit(event) {
        event.preventDefault();

        //Currently the backend doesn't respond to queries with spaces, 
        // so this replace function is a temporary workaround
        const endpoint = `/${service}/search/${searchQuery.replace(/ /g,'')}`;
        setSearchQuery(searchQuery.replace(/ /g,''));
        search(endpoint);
    }

    function search(endpoint) {
        setHideSpinner(false);
        facade.fetchData(endpoint, "GET").then(data => {
            props.update(data.all, service);
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
                            <form>
                                <div className="custom-control custom-switch  custom-control-inline">
                                    <input type="radio" name="serviceRadio" className="custom-control-input" id="youtube" value="youtube" checked={service == "youtube"} onChange={handleServiceChange} />
                                    <label className="custom-control-label" htmlFor="youtube">YouTube</label>
                                </div>
                                <div className="custom-control custom-switch  custom-control-inline">
                                    <input type="radio" name="serviceRadio" className="custom-control-input" id="twitch" value="twitch" checked={service == "twitch"} onChange={handleServiceChange} />
                                    <label className="custom-control-label" htmlFor="twitch">Twitch</label>
                                </div>
                                {/* <div className="custom-control custom-switch  custom-control-inline">
                                    <input type="radio" name="serviceRadio" className="custom-control-input" id="twitter" value="twitter" checked={service == "twitter"} onChange={handleServiceChange}/>
                                    <label className="custom-control-label" htmlFor="twitter">Twitter</label>
                                </div> */}
                            </form>
                            <form className="form-actions" style={{'text-align': 'center'}} onSubmit={handleSubmit}>
                                <input className="form-control mt-2" placeholder="Enter the name of a channel" value={searchQuery} onChange={handleQueryChange}/>
                                <Button type="submit" className="mt-2">
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

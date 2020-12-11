import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Search from './Search';
import SearchList from './SearchList';
import Channel from './Channel';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

function Home(props) {
  const initialChannelValue = {
    'id': null,
    'service': null
  }

  const [searchResults, setSearchResults] = useState([]);
  const [ytResults, setYtResults] = useState([]);
  const [twitchResults, setTwitchResults] = useState([]);
  const [displayList, setDisplayList] = useState(false);
  const [channelInfo, setChannelInfo] = useState(initialChannelValue);

  useEffect(() => {
    if (ytResults.length > 0 && twitchResults.length > 0) {
      let results = [...ytResults, ...twitchResults];
      setSearchResults(results);
      
      //Reset arrays
      setYtResults([]);
      setTwitchResults([]);
      //Der er simpelthen nødt til at være en bedre løsning til at opdatere siden, men jeg kan ikke på andet til at virke
      setDisplayList(true);
    }
  });

  const updateSearchResults = (results, srvce) => {
    const res = results.map(e => {
      return { ...e, 'service': srvce }
    });
    if (srvce === 'youtube') {
      setYtResults(res);
    } else if (srvce === 'twitch') {
      setTwitchResults(res);
    }
    setChannelInfo({ 'id': null, 'service': srvce });
  }

  const setId = (key, service) => {
    console.log(key);
    console.log(service);
    setChannelInfo({'id': key, 'service': service});
    setDisplayList(false);
  }

  return (
    <>
      <Container>
        <Col>
          <Search update={updateSearchResults} />
          {displayList ?
            <SearchList results={searchResults} updateId={setId} /> :
            <></>
          }
          {
            channelInfo.id ? <Channel channel={channelInfo}/> : <></>
          }
        </Col>
      </Container>
    </>
  );
}
export default Home;
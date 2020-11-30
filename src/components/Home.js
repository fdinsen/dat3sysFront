import React, {useState} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Search from './Search';
import SearchList from './SearchList';
import Channel from './Channel';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

function Home(props) {
  const initialValue = {
    'id': null,
    'service': null 
  }
  const [searchResults, setSearchResults] = useState([]);
  const [displayList, setDisplayList] = useState(false);
  const [channelInfo, setChannelInfo] = useState(initialValue);

  const updateSearchResults = (results, srvce) => {
    setSearchResults(results);
    setChannelInfo({'id': null, 'service': srvce});
    //Der er simpelthen nødt til at være en bedre løsning til at opdatere siden, men jeg kan ikke på andet til at virke
    setDisplayList(true);
  }

  const setId = (key, service) => {
    setChannelInfo({...channelInfo, 'id': key});
    setDisplayList(false);
  }

  return (
    <>
      <Container>
        <Col>
          <Search update={updateSearchResults}/>
          {displayList ? 
            <SearchList results={searchResults} updateId={setId}/> :
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

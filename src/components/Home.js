import React, {useState} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Search from './Search';
import SearchList from './SearchList';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

function Home(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [displayList, setDisplayList] = useState(false);

  const updateSearchResults = (results) => {
    setSearchResults(results);

    //Der er simpelthen nødt til at være en bedre løsning til at opdatere siden, men jeg kan ikke på andet til at virke
    setDisplayList(true);
  }

  return (
    <>
      <Container>
        <Col>
          <Search update={updateSearchResults}/>
          {displayList ? 
            <SearchList results={searchResults}/> :
            <></>
          }
        </Col>
      </Container>
    </>
  );
}
export default Home;

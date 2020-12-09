import React, { useState, useEffect } from 'react';
import facade from '../../apiFacade';
import heartFilled from '../../img/heart_filled.png';
import heartNoFillfrom from '../../img/heart_nofill.png';
import axios from 'axios';
import { URL } from '../../settings';
import { toast } from 'react-toastify';

function SaveAsFavourite(props) {
  const [src, setSrc] = useState(heartNoFillfrom);
  const [isFavourite, setIsFavourite] = useState(false);

  const addToFavourite = () => {
    const token = facade.getToken();

    axios
      .post(
        URL + '/user/favourite',
        {
          channelId: props.channelId,
          service: props.service,
        },
        { headers: { 'x-access-token': token } }
      )
      .then(function (response) {
        toast.success('Successfully added to your favourite list');
        setIsFavourite(true);
      })
      .catch(function (error) {
        toast.error(
          'Something went wrong while adding channel to your favourite list'
        );
      });
  };

  return (
    <>
      <img
        src={src}
        width="35px"
        style={{ float: 'right' }}
        onMouseEnter={() => {
          setSrc(heartFilled);
        }}
        onMouseOut={() => {
          if (!isFavourite) {
            setSrc(heartNoFillfrom);
          }
        }}
        title="Add to favorite"
        onClick={() => {
          if (!isFavourite) {
            addToFavourite();
          }
        }}></img>
    </>
  );
}
export default SaveAsFavourite;

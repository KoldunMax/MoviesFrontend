import React from 'react';
import {Image, Button, Modal } from 'semantic-ui-react';
import IMGmovie from '../../assets/movie.jpg';

export default ({ movie, onClose }) => (
  movie ? <Modal open={!!movie} onClose={onClose} style={{ top: 50 }}>
      <Modal.Header>{movie.title}</Modal.Header>
      <Modal.Content scrolling>
          <Image centered src={IMGmovie} size="medium" />
          <Modal.Description>
            <p>{movie.title}</p>
            ID: <p>{movie._id}</p>
            Release Year: <p>{movie.releaseYear}</p>
            Stars: <p>{movie.stars.join(', ')}</p>
          </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
          <Button 
            color="green" 
            content="close" 
            onClick={() => onClose && onClose()}
          />
      </Modal.Actions>
  </Modal> : null
);

import React from 'react';
import { Image, Button, Card } from 'semantic-ui-react';
import IMGmovie from '../../assets/movie.jpg';

export default ({ movies, onDelete, onView }) => (

<Card.Group itemsPerRow={3} centered style={{ marginTop: '.8rem' }}>
   {movies && movies.map((movie) => (
        <Card key={movie._id}>
            <Card.Content>
                <Image centered src={IMGmovie} style={{ marginBottom: '.5rem' }}/>
                <Card.Header>{movie.title}</Card.Header>
            </Card.Content>
            <Card.Content extra>
                <div className='ui three buttons'>
                  <Button 
                      icon="eye" 
                      floated="right" 
                      onClick={() => onView && onView(movie._id)} 
                  />
                  <Button 
                      color="red" 
                      icon="trash" 
                      floated="right" 
                      onClick={() => onDelete && onDelete(movie._id)} 
                  />
                </div>
            </Card.Content>
        </Card>
    ))
    }
    </Card.Group>
)
import React from 'react';
import emptyMovie from '../../assets/emptyMovie.png';
import { Image, Button, Container } from 'semantic-ui-react';

export default ({onCreate}) => (
    <Container>
        <Image centered rounded src={emptyMovie} size="medium"/>
        <Button 
            size="big" 
            content="Quickly add one!" 
            color="green" 
            onClick={() => onCreate && onCreate()} 
        /> 
    </Container>
)
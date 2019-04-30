import React from 'react';
import emptyMovie from '../../assets/emptyMovie.png';
import { Image, Container } from 'semantic-ui-react';

export default () => (
    <Container>
        <Image centered rounded src={emptyMovie} size="medium"/>
    </Container>
)
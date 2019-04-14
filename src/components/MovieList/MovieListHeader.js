import React from 'react';
import { Button, Container } from 'semantic-ui-react';

const HeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

export default ({ onCreate, listLength }) => (
    <Container style={HeaderStyle}>
        <Button
            content={listLength === 1 ? 'Movie' : 'Movies'}
            icon='tv'
            label={{ as: 'a', basic: true, pointing: 'right', content: listLength }}
            labelPosition='left'
        />
        <Button.Group>
            <Button
                icon="plus" 
                content="Add movie" 
                color="green" 
                onClick={() => onCreate && onCreate()}
            >    
            </Button>
        </Button.Group>
    </Container>
)
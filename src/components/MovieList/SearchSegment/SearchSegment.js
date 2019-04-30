import React from 'react';
import { Input, Segment, Button } from 'semantic-ui-react';

export default ({ onSetFilters, onChange }) => (
  <Segment>
    <Input
      style={{ width: '20%' }}
      placeholder='Title'
      name='title'
      onChange={onChange}
    />
    <Input
      style={{ width: '20%' }}
      placeholder='Star'
      name='star'
      onChange={onChange}
    />
    <Button
      icon="search"
      content="Search"
      color="blue"
      onClick={onSetFilters}
    >
    </Button>
  </Segment>
)
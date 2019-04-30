import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import SearchSegment from './SearchSegment/SearchSegment';
import EmptyMovieList from './EmptyMovieList.js';
import UploadButton from './UploadButton/UploadButton.js';
import { movieAPI } from '../../api';

const HeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

export default class MovieListHeader extends React.Component {

  state = {
    title: '',
    star: ''
  }

  onChange = ({ target }) => {
    this.setState(state => ({
      ...state,
      [target.name]: target.value
    })
    );
  }

  onSetFilters = () => {
    let { title, star } = this.state;
    let { setFilters } = this.props;
    setFilters(title, star);
  }

  onSetSorting = () => {
    const { setSorting, sorted } = this.props;
    if (sorted) {
      setSorting(false);
    } else {
      setSorting(true);
    }
  }

  uploadFile = (e) => {
    const file = e.target.files[0];
    let { sendFile } = this.props;
    if (file) {
      let fd = new FormData()
      fd.append('file', file)
      sendFile(fd);
    }
  }

  render() {
    let { onCreate, listLength, sorted } = this.props;
    console.log(sorted);
    return (
      <React.Fragment>
        <Container style={HeaderStyle}>
          <Button
            content={listLength === 1 ? 'Movie' : 'Movies'}
            icon='tv'
            label={{ as: 'a', basic: true, pointing: 'right', content: listLength }}
            labelPosition='left'
          />
          <SearchSegment
            onChange={this.onChange}
            onSetFilters={this.onSetFilters}
          />
          <Button.Group>
            <UploadButton
              handleFile={this.uploadFile}
            />
            <Button
                icon="sort down"
                content="Sort"
                color={sorted ? "blue" : "grey"}
                onClick={this.onSetSorting}
              >
            </Button>
            <Button
              icon="plus"
              content="Add movie"
              color="green"
              onClick={() => onCreate && onCreate()}
            >
            </Button>
          </Button.Group>
        </Container>
        {
          listLength === 0 ?
            <EmptyMovieList/>
            : null
        }
      </React.Fragment>
    )
  }
}
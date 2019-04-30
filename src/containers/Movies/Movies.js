import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Grid, Segment, Modal, Button } from 'semantic-ui-react';
import { fetchAllMovies, deleteMovie, setFilters, setSorting, sendFile } from './logic/moviesActions';
import { allMovies } from './logic/moviesReducers';
import MovieList from '../../components/MovieList/MovieList.js';
import MovieListHeader from '../../components/MovieList/MovieListHeader.js';
import MovieModal from '../../components/MovieModal/MovieModal.js';

class Movies extends React.Component {

  state = {
    activeMovie: null,
    open: false
  }

  componentDidMount() {
    this.props.actions.fetchAllMovies();
  }

  toggleMovieModal = id => {
    this.setState({
      activeMovie: this.props.allMovies.find(r => r._id === id)
    });
  };

  handleMovieCreate = () => {
    this.props.history.push(`/movies/new`);
  }

  handleDelete = (id) => {
    this.props.actions.deleteMovie(id);
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick, id) => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true, id})
  }


  close = () => this.setState({ open: false })

  render() {
    const { allMovies, sorted } = this.props;
    const { activeMovie, open, closeOnEscape, closeOnDimmerClick } = this.state;

    return (
      <Container>
        <Grid centered columns={1}>
          <Grid.Row>
            <Grid.Column>
              <Segment raised padded textAlign="center">
                <React.Fragment>
                  <MovieListHeader
                    onCreate={this.handleMovieCreate}
                    listLength={allMovies.length}
                    setFilters={this.props.actions.setFilters}
                    setSorting={this.props.actions.setSorting}
                    sendFile={this.props.actions.sendFile}
                    sorted={sorted}
                  />
                  <MovieList
                    movies={allMovies}
                    onView={this.toggleMovieModal}
                    closeConfigShow={this.closeConfigShow}
                  />
                  <Modal
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close}
                  >
                    <Modal.Header>Delete the movie</Modal.Header>
                    <Modal.Content>
                      <p>Are you sure you want to delete the movie</p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button onClick={this.close} negative>
                        No
                      </Button>
                      <Button
                        onClick={async () => {
                          await this.handleDelete(this.state.id)
                          await this.close()
                        }}
                        positive
                        labelPosition='right'
                        icon='checkmark'
                        content='Yes'
                      />
                    </Modal.Actions>
                  </Modal>
                </React.Fragment>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <MovieModal
          movie={activeMovie}
          onClose={() => this.toggleMovieModal(null)}
        />
      </Container>
    )
  }
}

Movies.propTypes = {
  allMovies: PropTypes.array,
  actions: PropTypes.object
}

const mapStateToProps = state => ({
  allMovies: allMovies(state),
  sorted: state.movies.sorting
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchAllMovies, deleteMovie, setFilters, setSorting, sendFile }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
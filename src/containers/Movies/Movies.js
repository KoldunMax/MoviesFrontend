import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Image, Grid, Segment } from 'semantic-ui-react';
import { fetchAllMovies } from './logic/moviesActions';
import { allMovies } from './logic/moviesReducers';
import MovieList from '../../components/MovieList/MovieList.js';
import MovieListHeader from '../../components/MovieList/MovieListHeader.js';
import EmptyMovieList from '../../components/MovieList/EmptyMovieList.js';
import MovieModal from '../../components/MovieModal/MovieModal.js';

class Movies extends React.Component {

  state = {
    activeMovie: null
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
    // this.props.history.push(`/movies/new`);
    console.log('creating movie');
  }

  handleDelete = (id) => {
    // this.props.actions.deleteMovie(id);
    console.log('deleting movie')
  }

  render() {
    const { allMovies } = this.props;
    const { activeMovie } = this.state;
    console.log(activeMovie);
    return(
      <Container>
      <Grid centered columns={1}>
          <Grid.Row>
              <Grid.Column>
                  <Segment raised padded textAlign="center">
                      {!allMovies.length
                          ? <EmptyMovieList 
                              onCreate={this.handleMovieCreate} 
                          />
                          : <React.Fragment>
                              <MovieListHeader 
                                  onCreate={this.handleMovieCreate} 
                                  listLength={allMovies.length} 
                              />
                              <MovieList
                                  movies={allMovies}
                                  onView={this.toggleMovieModal} 
                                  onDelete={this.handleDelete} 
                              />
                          </React.Fragment>
                      }
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
  allMovies: allMovies(state)
});


const mapDispatchToProps =  dispatch => ({
  actions: bindActionCreators({fetchAllMovies}, dispatch)
});

export default connect(mapStateToProps,  mapDispatchToProps)(Movies);
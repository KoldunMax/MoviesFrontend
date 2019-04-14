import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Image, Grid, Segment } from 'semantic-ui-react';
import { fetchAllMovies } from './logic/moviesActions';
import { allMovies } from './logic/moviesReducers';

class Movies extends React.Component {

  state = {
    activeMovie: null
  }

  componentDidMount() {
    this.props.actions.fetchAllMovies();
  }

  render() {
    const { allMovies } = this.props;
    console.log(allMovies);
    return(
      <Container>
      <Grid centered columns={1}>
          <Grid.Row>
              <Image src={logo} centered />
          </Grid.Row>
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
                                  onChange={this.setSearchValue}
                                  onDirectionSort={this.handleSort} 
                                  onShowShortList={this.onShowShortList}
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
          onClose={this.handleModalClose} 
          onUpdateRating={this.handleUpdateRating}
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
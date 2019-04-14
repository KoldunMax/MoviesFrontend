import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Image, Grid, Segment } from 'semantic-ui-react';
import { fetchAllMovies } from './logic/moviesActions';
import { allMovies } from './logic/moviesReducers';

class Movies extends React.Component {
  render() {
    const { allMovies } = this.props;
    return(
      <Container>
        {allMovies}        
      </Container>
    )
  }
}

Movies.propTypes = {
  allMovies: PropTypes.array
}

const mapStateToProps = state => ({
  allMovies: allMovies(state)
});


const mapDispatchToProps =  dispatch => ({
  actions: bindActionCreators({fetchAllMovies}, dispatch)
});

export default connect(mapStateToProps,  mapDispatchToProps)(Movies);
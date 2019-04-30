import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
import { addMovie } from '../Movies/logic/moviesActions';
import MovieForm from '../../components/MovieForm/MovieForm';

class Movie extends React.Component {

  handleSubmit = data => {
      let movieWithStarsInArrayType = this.transformStringTypeToArray(data);
      this.props.actions.addMovie(movieWithStarsInArrayType);
  }

  transformStringTypeToArray = (data) => {
    return {...data, stars: data.stars.split(',').map(item=>item.trim())}
  };

  moveToMovies = () => {
      this.props.history.push(`/movies`);
  }

  render() {
      return <Container>
          <Grid centered columns={2}>
          <Grid.Column>
              <MovieForm
                title="Specify new movie"
                onSubmit={this.handleSubmit}
                onCancel={this.moveToMovies}
                submitButtonTitle ="Add movie"
                submitButtonIcon="plus"
                cancelButtonTitle="Go back to movies"
                cancelButtonIcon="arrow left"
              />
          </Grid.Column>
          </Grid>
      </Container>
  }
}

Movie.propTypes = {
  actions: PropTypes.object.isRequired
}

const mapDispatchToProps =  dispatch => ({
  actions: bindActionCreators({addMovie}, dispatch)
});

export default connect(null, mapDispatchToProps)(Movie);
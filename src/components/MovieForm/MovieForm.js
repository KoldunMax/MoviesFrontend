    
import React from 'react';
import PropTypes from 'prop-types';
import {Segment, Form, Image, Header, Button } from 'semantic-ui-react';
import IMGmovie from '../../assets/movie.jpg';

const regexForYear = /^(189[5-9]|19[5-9]\d|20[0-1]\d|2020)$/;
const regexNotEmpty = /^(?!\s*$).+/;
const regexNamesSeparatedByComma = /^([a-zA-Z, ]+\s?,)*([a-zA-Z, ]+)$/;

const objFields = {
    title: regexNotEmpty,
    releaseYear: regexForYear,
    format: regexNotEmpty,
    stars: regexNamesSeparatedByComma
  }

export default class MovieForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.initialValues.title,
            releaseYear: props.initialValues.releaseYear,
            format: props.initialValues.format,
            stars: props.initialValues.stars
        }
    }

    handleFieldChange = ({ target }) => {
            this.setState(state => ({
                ...state,
                [target.name]: target.value
            })
        );
    }

    checkOneField = (fieldName, regulartExp) => {
        if (!regulartExp.test(this.state[fieldName])) {
          this.setState({[fieldName]: 'A field is invalid'});
          return false
        }
        return true; 
    }

    checkAllFields = async () => {    
        for(let i in objFields) {
          let isNameCorrect = await this.checkOneField(i, objFields[i]);
          if (!isNameCorrect) return Promise.resolve(false);
        }
        
        return Promise.resolve(true);
    }

    handleCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    handleSubmit = async () => {
        let isAllFieldsCorrect = await this.checkAllFields();
        console.log(isAllFieldsCorrect);
        if (this.props.onSubmit && isAllFieldsCorrect) {
            this.props.onSubmit(this.state);
        }
    }

    isSubmitAllowed() {
        let { title, releaseYear, format, stars } = this.state
        return title && releaseYear>0 && format && stars
    }

    render() {
        const { submitButtonTitle, submitButtonIcon, cancelButtonTitle, cancelButtonIcon, title: formTitle } = this.props;
        let { title, releaseYear, format, stars } = this.state
        return (<Segment.Group raised>
                <Header block attached="top" as="h3">
                    {formTitle}
                </Header>
                <Segment attached>
                    <Image centered src={IMGmovie} size="small" />
                    <Form>
                        
                        <Form.Input
                            label="Title"
                            name="title"
                            value={title === 'A field is invalid' ? '' : title}
                            autoComplete="off"
                            placeholder="Movie title"
                            onChange={this.handleFieldChange}
                        />
                        {title === 'A field is invalid'
                            ? <span style={{color: 'red'}}>You've to set a title</span>
                            : null}
                        <Form.Input
                            label="Release year"
                            name="releaseYear"
                            value={releaseYear === 'A field is invalid' ? '' : releaseYear}
                            autoComplete="off"
                            placeholder="Number"
                            onChange={this.handleFieldChange}
                        />
                        {releaseYear === 'A field is invalid'
                            ? <span style={{color: 'red'}}>A year has to be in a range from 1895 - 2020</span>
                            : null}
                        <Form.Input
                            label="Format"
                            name="format"
                            value={format === 'A field is invalid' ? '' : format}
                            autoComplete="off"
                            placeholder="DVD, VHS, Blu-Ray etc."
                            onChange={this.handleFieldChange}
                        />
                        {format === 'A field is invalid'
                            ? <span style={{color: 'red'}}>You've to set a format</span>
                            : null}
                        <Form.TextArea
                            label="Stars, please, separate name of stars by comma"
                            name="stars"
                            value={stars === 'A field is invalid' ? '' : stars}
                            placeholder="John Smith, Bin Ben, Clue Nickson"
                            onChange={this.handleFieldChange}
                        />
                        {stars === 'A field is invalid'
                            ? <span style={{color: 'red'}}>You've to set star's names which separate by comma e.g John Smith, Ben Diller</span>
                            : null}
                    </Form>
                </Segment>
                <Segment attached textAlign="right">
                    <Button icon={cancelButtonIcon} content={cancelButtonTitle} onClick={this.handleCancel} />
                    <Button icon={submitButtonIcon} color="green" content={submitButtonTitle} onClick={this.handleSubmit} disabled={!this.isSubmitAllowed()} />
                </Segment>
            </Segment.Group>)
    }

}

MovieForm.defaultProps = {
    initialValues: {
        title: '',
        releaseYear: 0,
        format: '',
        stars: ''
    }
};

MovieForm.propTypes ={
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitButtonTitle: PropTypes.string.isRequired,
    submitButtonIcon: PropTypes.string.isRequired,
    cancelButtonTitle: PropTypes.string.isRequired,
    cancelButtonIcon: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({
        title: PropTypes.string,
        releaseYear: PropTypes.number,
        format: PropTypes.string,
        stars: PropTypes.string
    })
};
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  Label,
  Button
} from 'semantic-ui-react'

class UploadButton extends Component {

  uploadFile = (e) => {
    const tagNameELement = e.target.tagName
    if (tagNameELement !== 'DIV') {
      this.refs.uploadInput.click()
    }
  }

  render () {
  let {
    handleFile,
  } = this.props
  return (
      <React.Fragment>
        <Label
          as='label'
          basic
          htmlFor='upload'
        >
          <Button
            icon='upload'
            label={{
              basic: true,
              content: 'upload'
            }}
            labelPosition='right'
            onClick={this.uploadFile}
          />
          <input
            hidden
            id='upload'
            multiple
            onChange={handleFile}
            type='file'
            accept='.txt'
            ref='uploadInput'
          />
        </Label>
      </React.Fragment>
    )
  }
}

UploadButton.propTypes = {
  handleFile: PropTypes.func
}

export default UploadButton

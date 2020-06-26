import React, { Component } from 'react';
import axios from 'axios'

class SingleBlock extends Component {
  state = {
    block: {},
    isLoading: true
  }

  componentDidMount() {
    this.fetchSingleStudent();
  }

  fetchSingleStudent = () => {
    const { _id } = this.props
    axios
      .get(`https://nc-student-tracker.herokuapp.com/api/blocks/${_id}`)
      .then(response => {
        this.setState({ block: response.data.block, isLoading: false })
      })
  }

  render() {
    const { isLoading, block } = this.state;
    if (isLoading) return <p>isLoading</p>
    else {
      return (
        <div className="students-single">
          <h2>{block.name}</h2>
          <h3>Block History:</h3>
        </div>
      );
    }
  }
}

export default SingleBlock;
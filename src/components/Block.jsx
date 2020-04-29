import React, { Component } from 'react';
import axios from 'axios'
import { Link } from '@reach/router'

class Block extends Component {
  state = { isLoading: true, blocks: [] }
  componentDidMount() {
    this.fetchBlockInfo()
  }

  fetchBlockInfo = () => {
    axios
      .get('https://nc-student-tracker.herokuapp.com/api/blocks')
      .then(response => {
        this.setState({ blocks: response.data.blocks, isLoading: false })
      })
  }

  render() {
    const { isLoading, blocks } = this.state;
    if (isLoading) return <p>Is Loading ...</p>
    else {
      return <ul>
        {blocks.map(block => {
          return (
            <li key={`${block._id}`}>
              <Link to={`/students/block/${block.slug}`}>{`${block.name} `}</Link>
            </li>);
        })
        }
      </ul>;
    }
  }
}

export default Block;
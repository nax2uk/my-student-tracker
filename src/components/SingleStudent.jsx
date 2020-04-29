import React, { Component } from 'react';
import axios from 'axios';

class SingleStudent extends Component {
  state = {
    student: {},
    curr_block: 0,
    isLoading: true
  }

  componentDidMount() {

    this.fetchSingleStudent();
  }

  fetchSingleStudent = () => {
    const { _id } = this.props
    axios
      .get(`https://nc-student-tracker.herokuapp.com/api/students/${_id}`)
      .then(response => {
        //console.log(response);
        this.setState({ student: response.data.student, isLoading: false })
      })
  }

  render() {

    const { isLoading, student } = this.state;
    if (isLoading) return <p>isLoading</p>
    else {
      return (
        <div className="students-single">
          <h2>{student.name}</h2>
          <p>Current Block: {student.blockHistory[student.blockHistory.length - 1].name}</p>
          <p>Starting Cohort: {student.startingCohort}</p>
        </div>
      );
    }
  }
}

export default SingleStudent;
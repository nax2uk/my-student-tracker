import React, { Component } from 'react';
import Header from '../Navs/Header';
import axios from 'axios';

class SingleStudentPage extends Component {
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
        this.setState({ student: response.data.student, isLoading: false })
      })
  }

  render() {

    const { isLoading, student } = this.state;
    if (isLoading) return <p>isLoading</p>
    else {
      return (<>
        <Header headerHome={false} headerTitle={student.name} />
        <main>
          <section className="post">
            <h2>{student.name}</h2>
            <p>Current Block: {student.blockHistory[student.blockHistory.length - 1].name}</p>
            <p>Starting Cohort: {student.startingCohort}</p>
            <br />
            <br />
          </section>
        </main>
      </>
      );
    }
  }
}

export default SingleStudentPage;
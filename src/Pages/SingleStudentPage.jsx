import React, { Component } from 'react';
import Header from '../Navs/Header';
import * as api from '../utils/api';
import Loader from '../components/Loader';

class SingleStudentPage extends Component {
  state = {
    student: {},
    curr_block: 0,
    isLoading: true,
    err: ""
  }

  componentDidMount() {
    this.fetchSingleStudent();
  }


  fetchSingleStudent = () => {
    const { _id } = this.props
    api
      .getSingleStudent(_id)
      .then(({ student }) => {
        this.setState({ student: student, isLoading: false });
      })
      .catch(err => {
        this.setState({ err: { status: err.response.status, msg: err.response.data.message }, isLoading: false });
      });
  }

  render() {

    const { isLoading, student } = this.state;
    if (isLoading) return <Loader />
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
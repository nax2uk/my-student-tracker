import React, { Component } from 'react';
import Header from '../Navs/Header';
import ErrorPage from '../Pages/ErrorPage';
import * as api from '../utils/api';

class AddStudentPage extends Component {
  state = {
    name: '',
    startingCohort: '',
    msg: "",
    err: ""
  }

  addStudent = () => {
    const { name, startingCohort } = this.state;
    api
      .postStudent(name, startingCohort)
      .then(({ student }) => {
        this.setState({
          msg: `${student.name} has been added to the system.`,
          name: "",
          startingCohort: ""
        });
      })
      .catch(err => {
        console.dir(err);
        this.setState({ err: { status: err.response.status, msg: err.response.data.message } })
      });
  }

  handleAddStudent = (event) => {
    event.preventDefault();
    this.addStudent();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { name, startingCohort, msg, err } = this.state;
    if (err) return <ErrorPage err={err} />
    return (
      <>
        <Header headerHome={false} headerTitle="Add Student" />
        <main>
          <div className="post">
            <h2>Add Student</h2>
            <form onSubmit={this.handleAddStudent}>

              <label htmlFor='name'>Name: </label>
              <input id='name' type='text' name='name' value={name} onChange={this.handleChange} />

              <label htmlFor='cohort'>Starting Cohort: </label>
              <input id='cohort' type="text" name="startingCohort" value={startingCohort} onChange={this.handleChange} />

              <button className="btn">Add Student</button>
            </form>
            {msg && <p>{msg}</p>}
          </div>
        </main>
      </>
    );
  }
}

export default AddStudentPage;
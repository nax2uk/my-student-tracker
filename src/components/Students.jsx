import React, { Component } from 'react';
import axios from 'axios'
import { Link } from '@reach/router'
import AddStudentForm from './AddStudentForm'
import getStringCurrentBlock from '../utils/getStringCurrentBlock'

class Students extends Component {
  state = {
    isLoading: true,
    students: []
  }

  componentDidMount() {
    this.fetchStudents();
  }


  fetchStudents = () => {
    axios
      .get('https://nc-student-tracker.herokuapp.com/api/students/', {
        params: {
          block: this.props.slug
        }
      })
      .then(response => {
        this.setState({ students: response.data.students, isLoading: false })
      })
  }

  addStudent = (name, startingCohort) => {
    axios
      .post('https://nc-student-tracker.herokuapp.com/api/students/', {
        name: name,
        startingCohort: startingCohort
      })
      .then(() => {
        this.fetchStudents();
      });

  }
  deleteStudent = (id) => {
    axios
      .delete(`https://nc-student-tracker.herokuapp.com/api/students/${id}`)
      .then(() => {
        this.fetchStudents();
      })
  }

  graduateStudent = (id) => {
    axios
      .patch(`https://nc-student-tracker.herokuapp.com/api/students/${id}?progress=true`)
      .then(() => {
        this.fetchStudents();
      })
  }

  handleGraduate = (event) => {
    this.graduateStudent(event.target.id);
  }

  handleDelete = (event) => {
    this.deleteStudent(event.target.id);
  }



  render() {
    const { students, isLoading } = this.state;
    if (isLoading) return <p>Is Loading ..</p>;
    else {
      return (
        <div className="students">
          {(this.props.slug === undefined) && <AddStudentForm addStudent={this.addStudent} />}
          {(this.props.slug) && <h2>{getStringCurrentBlock(students[0].currentBlock)}</h2>}
          <p>Total Number of Students: {students.length}</p>
          <ul>
            {
              students.map(({ _id, name }) => {
                return (
                  <li key={`${_id}`}>
                    <Link to={`/students/${_id}`}>{`${name}`}</Link>
                    {(this.props.slug && this.props.slug !== 'grad') ? < button onClick={this.handleGraduate} id={`${_id}`}>Graduate!</button> : <button onClick={this.handleDelete} id={`${_id}`}>Delete Student</button>}
                  </li>);
              })
            }
          </ul>
        </div>
      );
    }
  }

}

export default Students;
import React, { Component } from 'react';
import axios from 'axios'
import { Link } from '@reach/router'
import AddStudentForm from './AddStudentForm'
import getStringCurrentBlock from '../utils/getStringCurrentBlock'
import SortByOption from './SortByOption'
import './Students.css'

class Students extends Component {
  state = {
    isLoading: true,
    students: []
  }

  componentDidMount() {
    this.fetchStudents({});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) {
      this.fetchStudents({});
    }
  }


  fetchStudents = ({ sort_by }) => {
    //console.log(this.props)
    axios
      .get('https://nc-student-tracker.herokuapp.com/api/students/', {
        params: {
          block: this.props.slug,
          graduated: this.props.graduated,
          sort_by: sort_by
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
      .then((response) => {
        this.addStudentToState(response.data.student);
      });

  }

  addStudentToState = (student) => {
    this.setState(currState => {
      return ({ students: [student, ...currState.students] });
    })

  }

  deleteStudentFromState = (id) => {
    this.setState(currState => {
      return ({ students: currState.students.filter(student => student._id !== id) })
    })

  }
  deleteStudent = (id) => {
    axios
      .delete(`https://nc-student-tracker.herokuapp.com/api/students/${id}`)
      .then(() => {
        this.deleteStudentFromState(id);
      })
  }

  graduateStudent = (id) => {
    axios
      .patch(`https://nc-student-tracker.herokuapp.com/api/students/${id}?progress=true`)
      .then(() => {
        this.deleteStudentFromState(id);
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
          {(this.props.graduated) && <AddStudentForm addStudent={this.addStudent} />}
          {((this.props.graduated === undefined) && (this.props.slug === undefined)) &&
            <h2>Total Number of Students Past and Present</h2>}
          {(this.props.slug) &&
            <h2>{getStringCurrentBlock(students[0].currentBlock)}</h2>}

          {(this.props.graduated) && <h2> Current Students </h2>}
          <SortByOption fetchStudents={this.fetchStudents} />

          <h3>Total Number of Students: {students.length}</h3>
          <table>
            <thead>
              <tr>
                <th key="name">Student Name</th>
                <th key="cohort" className="align-center">Starting Cohort</th>
                <th key="block" className="align-left" colSpan="2">Current Block</th>
              </tr>
            </thead>
            <tbody>
              {
                students.map(({ _id, name, currentBlock, startingCohort }) => {
                  return (
                    <tr key={`${_id}`}>
                      <td className="student-name">
                        <Link to={`/students/${_id}`}>{`${name}`}</Link>
                      </td>
                      <td className="align-center">{startingCohort}</td>
                      <td className="align-left">
                        {getStringCurrentBlock(currentBlock)}
                      </td>
                      {(this.props.slug && this.props.slug !== 'grad') &&
                        <td className='align-right'>
                          <button onClick={this.handleGraduate} id={`${_id}`}>Graduate!</button>
                        </td>}
                      {this.props.graduated &&
                        <td className='align-right'>
                          <button onClick={this.handleDelete} id={`${_id}`}>Delete Student</button>
                        </td>}
                      {(this.props.slug === 'grad' || ((this.props.slug === undefined) && (this.props.graduated === undefined))) && <td></td>}

                    </tr>);
                })
              }
            </tbody></table>
        </div >
      );
    }
  }
}

export default Students;
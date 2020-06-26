import React, { Component } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import getStringCurrentBlock from '../utils/getStringCurrentBlock'
import SortByOption from '../components/SortByOption';
import Header from '../Navs/Header';
import Loader from '../components/Loader';

class StudentsPage extends Component {
  state = {
    isLoading: true,
    students: [],
    titleHeader: ""
  }

  componentDidMount() {
    this.fetchStudents({});
    if ((this.props.graduated === undefined) && (this.props.slug === undefined)) {
      this.setState({ titleHeader: "All Students" });
    }
    else if (this.props.slug === "grad") {
      this.setState({ titleHeader: "Past Students" });
    }
    else if (this.props.graduated || (this.props.slug === "fun" || "fe" || "be" || "proj")) {
      console.log(this.props.slug, this.props.graduated);

      this.setState({ titleHeader: "Current Students" });
    }

  }

  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) {
      this.fetchStudents({});
    }
  }


  fetchStudents = ({ sort_by }) => {

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
    const { students, isLoading, titleHeader } = this.state;
    if (isLoading) return <Loader />;
    else {
      return (<>
        <Header headerHome={false} headerTitle={titleHeader} />
        <main>
          <section className="post">
            {((this.props.graduated === undefined) && (this.props.slug === undefined)) &&
              <h2>Students Past and Present : {students.length}</h2>}
            {(this.props.slug) &&
              <h2>{`${getStringCurrentBlock(students[0].currentBlock)} : ${students.length}`}</h2>}

            {(this.props.graduated) && <h2> All : {students.length} </h2>}

            <div className="meta"><SortByOption fetchStudents={this.fetchStudents} /></div>
            <div className="container">


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
                              <button className="btn" onClick={this.handleGraduate} id={`${_id}`}>Graduate!</button>
                            </td>}
                          {this.props.graduated &&
                            <td className='align-right'>
                              <button className="btn" onClick={this.handleDelete} id={`${_id}`}>Delete Student</button>
                            </td>}
                          {(this.props.slug === 'grad' || ((this.props.slug === undefined) && (this.props.graduated === undefined))) && <td></td>}

                        </tr>);
                    })
                  }
                </tbody></table>
            </div>
          </section>
        </main>
      </>
      );
    }
  }
}

export default StudentsPage;
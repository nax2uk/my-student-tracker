import React from 'react';
import { Link } from '@reach/router';
import * as api from '../utils/api';
import getStringCurrentBlock from '../utils/getStringCurrentBlock';

const StudentsTable = (props) => {
  const { students, slug, graduated } = props;

  /** GRADUATE STUDENT FROM CURRENT BLOCK **/
  const graduateStudent = (id) => {
    api
      .patchStudentProgress(id)
      .then(() => {
        props.removeStudentFromState(id);
      })
      .catch(err => {
        props.setErrorState(err.status, err.msg);
      })
  }

  const handleGraduate = (event) => {
    graduateStudent(event.target.id);
  }

  /** DELETE STUDENT **/
  const removeStudent = (id) => {
    api.deleteStudent(id)
      .then(() => {
        this.removeStudentFromState(id);
      })
      .catch(err => {
        props.setErrorState(err.status, err.msg);
      })
  }

  const handleDelete = (event) => {
    removeStudent(event.target.id);
  }

  return (
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
                  {(slug && slug !== 'grad') &&
                    <td className='align-right'>
                      <button className="btn" onClick={handleGraduate} id={`${_id}`}>Graduate!</button>
                    </td>}
                  {graduated &&
                    <td className='align-right'>
                      <button className="btn" onClick={handleDelete} id={`${_id}`}>Delete Student</button>
                    </td>}
                  {(slug === 'grad' || ((slug === undefined) && (graduated === undefined))) && <td></td>}
                </tr>);
            })
          }
        </tbody></table>
    </div>
  );
};

export default StudentsTable;
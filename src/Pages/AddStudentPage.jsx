import React, { Component } from 'react';
import Header from '../Navs/Header';

class AddStudentPage extends Component {
  state = {
    name: '',
    startingCohort: ''
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleAddStudent = (event) => {
    event.preventDefault();
    const { addStudent } = this.props;
    const { name, startingCohort } = this.state;
    addStudent(name, startingCohort);
    this.setState({ name: '', startingCohort: '' });

  }
  render() {
    const { startingCohort, name } = this.state;
    return (
      <>
        <Header headerHome={false} headerTitle="Add Student" />
        <main>
          <div className="post">
            <h2>Add Student</h2>
            <div className="container">
              <form onSubmit={this.handleAddStudent}>
                <table>
                  <tr>
                    <td className="td-label">
                      <label>Name: </label>
                    </td>
                    <td className="align-right">
                      <input name='name' value={name} onChange={this.handleChange} />
                    </td>
                  </tr>
                  <tr>
                    <td className="td-label">
                      <label>Starting Cohort: </label>
                    </td>
                    <td className="align-right">
                      <input type="text" name="startingCohort" value={startingCohort} onChange={this.handleChange} />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" className="align-right">
                      <button className="btn">Add Student</button>
                    </td>
                  </tr>
                </table>
              </form>
            </div>
          </div>
        </main>
      </>

    );
  }
}

export default AddStudentPage;
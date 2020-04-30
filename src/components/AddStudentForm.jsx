import React, { Component } from 'react';
import './AddStudentForm.css'

class AddStudentForm extends Component {
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
      <form onSubmit={this.handleAddStudent}>
        <label>Name: </label><input name='name' value={name} onChange={this.handleChange} />
        <label>Starting Cohort: </label><input type="text" name="startingCohort" value={startingCohort} onChange={this.handleChange} />
        <button>Add Student</button>
      </form>
    );
  }
}

export default AddStudentForm;
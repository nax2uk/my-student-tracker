import React from 'react';
import { Router } from '@reach/router';
import HomePage from './Pages/HomePage';
import Students from './Pages/StudentsPage';
import SingleStudent from './Pages/SingleStudentPage';
import ErrorPage from './Pages/ErrorPage';
import Footer from './Navs/Footer';
import AddStudentPage from './Pages/AddStudentPage';


const App = () => {
  return (
    <>
      <Router>
        <HomePage path='/' />
        { /* All Students Page */}
        <Students path='/students' />
        {/* Student Details Page */}
        <SingleStudent path='/students/:_id' />
        {/* Current Students in a specific block Page  */}
        <Students path='/students/block/:slug' />
        {/* All Current Students Page */}
        <Students path='/students/graduated/:graduated' />
        {/* Add Student Page */}
        <AddStudentPage path='/addstudent' />
        {/* Error Page */}
        <ErrorPage default />
      </Router>
      <Footer />
    </>
  );
};

export default App;

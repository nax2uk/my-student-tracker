import React from 'react';
import { Router } from '@reach/router'
import HomePage from './HomePage'
import Students from './Students'
import Block from './Block'
import SingleStudent from './SingleStudent'
import SingleBlock from './SingleBlock'

const Main = () => {
  return (
    <main>
      <Router>
        <HomePage path='/' />
        <Students path='/students' />
        <SingleStudent path='/students/:_id' />
        <Block path='/blocks' />
        <SingleBlock path='/blocks/:_id' />
        <Students path='/students/block/:slug' />
        <Students path='/students/graduated/:graduated' />
      </Router>
    </main>
  );
};

export default Main;
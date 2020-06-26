import React from 'react';
import Header from '../Navs/Header';
import { Link } from '@reach/router';

const ErrorPage = props => {
  const { status, msg } = props.err;
  console.log(status, msg);
  return (
    <>
      <Header headerHome={false} headerTitle="Ooops" />
      <main>
        <div className="post">
          {status ?
            <h2>{`Error Status: ${status}`}</h2>
            : <h2>We could not find what you are looking for...</h2>}
          <Link to="/">Go back to the Home Page</Link>
          <p>{msg}</p>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
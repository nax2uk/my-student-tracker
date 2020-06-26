import React, { Component } from 'react';
import TitlePage from '../components/TitlePage';
import SortByOption from '../components/SortByOption';
import Header from '../Navs/Header';
import Loader from '../components/Loader';
import ErrorPage from '../Pages/ErrorPage';
import * as api from '../utils/api';
import StudentsTable from '../components/StudentsTable';

class StudentsPage extends Component {
  state = {
    isLoading: true,
    students: [],
    titleHeader: "",
    err: ""
  }

  /** GET STUDENTS TO DISPLAY IN TABLE **/
  fetchStudents = ({ sort_by }) => {
    api
      .getAllStudents({ sort_by: sort_by, block: this.props.slug, graduated: this.props.graduated })
      .then(({ students }) => {
        this.setState({ students: students, isLoading: false })
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          err: { status: err.response.status, msg: err.response.data.message }
        });
      })
  }

  /** DELETE STUDENT FROM STATE, USED WHEN GRADUATE/DELETE BUTTON IS CLICKED**/
  removeStudentFromState = (id) => {
    this.setState(currState => {
      return ({ students: currState.students.filter(student => student._id !== id) })
    })

  }

  /** SET ERROR STATE, USED WHEN GRADUATE/DELETE BUTTON IS CLICKED**/
  setErrorState = (status, msg) => {
    this.setState({ err: { status: status, msg: msg } });
  }

  /** TITLE FOR HEADER **/
  fetchTitleHeader = () => {
    const { graduated, slug } = this.props;
    if ((graduated === undefined) && (slug === undefined)) {
      this.setState({ titleHeader: "All Students" });
    }
    else if (slug === "grad") {
      this.setState({ titleHeader: "Past Students" });
    }
    else if (graduated || (slug === "fun" || "fe" || "be" || "proj")) {
      this.setState({ titleHeader: "Current Students" });
    }
  }

  /** REACT LIFECYCLE **/
  componentDidMount() {
    this.fetchStudents({});
    this.fetchTitleHeader();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) {
      this.fetchStudents({});
    }
  }

  render() {
    const { students, isLoading, titleHeader, err } = this.state;
    const { slug, graduated } = this.props;

    if (isLoading) return <Loader />;
    else if (err) return <ErrorPage err={err} />
    return (<>
      <Header headerHome={false} headerTitle={titleHeader} />
      <main>
        <section className="post">
          <TitlePage
            students={students}
            slug={slug}
            graduated={graduated}
          />

          <SortByOption
            fetchStudents={this.fetchStudents}
          />

          <StudentsTable
            students={students}
            slug={slug}
            graduated={graduated}
            removeStudentFromState={this.removeStudentFromState}
            setErrorState={this.setErrorState}
          />

        </section>
      </main>
    </>
    );
  }
}

export default StudentsPage;
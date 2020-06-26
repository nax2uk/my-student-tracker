import axios from 'axios';

export const getAllStudents = ({ sort_by, block, graduated }) => {
  return axios
    .get('https://nc-student-tracker.herokuapp.com/api/students/', {
      params: {
        block: block,
        graduated: graduated,
        sort_by: sort_by
      }
    })
    .then(({ data: { students } }) => {
      return { students: students };
    });
}

export const postStudent = (name, startingCohort) => {
  return axios
    .post('https://nc-student-tracker.herokuapp.com/api/students/', {
      name: name,
      startingCohort: startingCohort
    })
    .then(({ data: { student } }) => {
      return ({ student: student });
    });
}

export const getSingleStudent = (id) => {

  return axios
    .get(`https://nc-student-tracker.herokuapp.com/api/students/${id}`)
    .then(({ data: { student } }) => {
      return ({ student: student });
    })

}

export const deleteStudent = (id) => {
  return axios
    .delete(`https://nc-student-tracker.herokuapp.com/api/students/${id}`);
}

export const patchStudentProgress = (id) => {
  return axios
    .patch(`https://nc-student-tracker.herokuapp.com/api/students/${id}?progress=true`);
}
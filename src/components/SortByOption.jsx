import React from 'react';

const SortByOption = (props) => {

  const handleSort = (event) => {
    props.fetchStudents({ sort_by: event.target.value });
  }

  return (
    <div className="meta">
      <label>Sort By: </label>
      <select onChange={handleSort}>
        <option>Sort By</option>
        <option value="name" >Name</option>
        <option value="startingCohort">Starting Cohort</option>
      </select>
    </div>
  );

}

export default SortByOption;
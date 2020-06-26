import React from 'react';
import getStringCurrentBlock from '../utils/getStringCurrentBlock';

const TitlePage = (props) => {
  const { students, graduated, slug } = props;
  return (
    <>
      {((graduated === undefined) && (slug === undefined)) &&
        <h2>Students Past and Present : {students.length}</h2>}
      {
        (slug) &&
        <h2>{`${getStringCurrentBlock(students[0].currentBlock)} : ${students.length}`}</h2>
      }

      {(graduated) && <h2> All Current Students: {students.length} </h2>}
    </>
  );

};

export default TitlePage;
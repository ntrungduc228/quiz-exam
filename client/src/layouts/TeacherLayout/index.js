import React from 'react';

const TeacherLayout = ({ children }) => {
  console.log('chilrd', children);
  return (
    <React.Fragment>
      <div>
        TeacherLayout
        {children}
        {}
        children
      </div>
    </React.Fragment>
  );
};

export default TeacherLayout;

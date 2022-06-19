import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { FirebaseProvider } from './contexts/FirebaseContext';

import routes, { renderRoutes, teacherRoutes, adminRoutes, studentRoutes } from './routes';
import { BASENAME } from './config/constant';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

const App = () => {
  return (
    <React.Fragment>
      <Router basename="/teacher">{renderRoutes(teacherRoutes)}</Router>
      <Router basename="/admin">{renderRoutes(adminRoutes)}</Router>
      <Router basename={BASENAME}>{renderRoutes(studentRoutes)}</Router>
      {/* <Router basename={BASENAME}>
        <FirebaseProvider>{renderRoutes(routes)}</FirebaseProvider>
      </Router> */}
    </React.Fragment>
  );
};

export default App;

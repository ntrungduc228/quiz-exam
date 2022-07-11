import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { FirebaseProvider } from './contexts/FirebaseContext';
import Loader from './components/Loader/Loader';
import { renderRoutes, teacherRoutes, adminRoutes, studentRoutes, authRoutes, errorRoutes } from './routes';
import { BASENAME } from './config/constant';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            {renderRoutes(authRoutes)}
            {renderRoutes(studentRoutes)}
            {renderRoutes(adminRoutes)}
            {renderRoutes(teacherRoutes)}
            {renderRoutes(errorRoutes)}
          </Switch>
        </Suspense>
      </Router>
    </React.Fragment>
  );
};

export default App;

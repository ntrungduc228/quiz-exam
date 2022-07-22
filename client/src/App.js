import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import { renderRoutes, teacherRoutes, adminRoutes, studentRoutes, authRoutes, errorRoutes } from './routes';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            {renderRoutes(studentRoutes)}
            {renderRoutes(adminRoutes)}
            {renderRoutes(teacherRoutes)}
            {renderRoutes(authRoutes)}
            {renderRoutes(errorRoutes)}
          </Switch>
        </Suspense>
      </Router>
    </React.Fragment>
  );
};

export default App;

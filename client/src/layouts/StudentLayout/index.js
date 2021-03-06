import React, { useContext, useEffect, useRef } from 'react';

import Navigation from '../AdminLayout/Navigation';
import Breadcrumb from '../AdminLayout/Breadcrumb';
import NavBar from '../AdminLayout/NavBar';

import useWindowSize from '../../hooks/useWindowSize';
import useOutsideClick from '../../hooks/useOutsideClick';
import { ConfigContext } from '../../contexts/ConfigContext';
import * as actionType from '../../store/actions';
import { studentMenuItems } from '../../menu-items';

const StudentLayout = ({ children }) => {
  const windowSize = useWindowSize();
  const ref = useRef();
  const configContext = useContext(ConfigContext);

  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;

  useOutsideClick(ref, () => {
    if (collapseMenu) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }
  });

  useEffect(() => {
    if (windowSize.width > 992 && windowSize.width <= 1024) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }
  }, [dispatch, windowSize]);

  const mobileOutClickHandler = () => {
    if (windowSize.width < 992 && collapseMenu) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }
  };

  let mainClass = ['pcoded-wrapper'];

  let common = (
    <React.Fragment>
      <Navigation menuItems={studentMenuItems} />
    </React.Fragment>
  );

  let mainContainer = (
    <React.Fragment>
      <NavBar />
      <div className="pcoded-main-container">
        <div className={mainClass.join(' ')}>
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <Breadcrumb />
              {children}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  if (windowSize.width < 992) {
    let outSideClass = ['nav-outside'];
    if (collapseMenu) {
      outSideClass = [...outSideClass, 'mob-backdrop'];
    }

    common = (
      <div className={outSideClass.join(' ')} ref={ref}>
        {common}
      </div>
    );

    mainContainer = (
      <div className="pcoded-outside" onClick={() => mobileOutClickHandler}>
        {mainContainer}
      </div>
    );
  }
  return (
    <React.Fragment>
      {common}
      {mainContainer}
    </React.Fragment>
  );
};

export default StudentLayout;

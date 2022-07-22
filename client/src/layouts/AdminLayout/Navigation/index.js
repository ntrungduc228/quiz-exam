import React, { useContext } from 'react';

import { ConfigContext } from '../../../contexts/ConfigContext';
import useWindowSize from '../../../hooks/useWindowSize';

import NavLogo from './NavLogo';
import NavContent from './NavContent';
// import navigation, { teacherMenuItems, studentMenuItems } from '../../../menu-items';

const Navigation = ({ menuItems }) => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const windowSize = useWindowSize();

  let navClass = [
    'pcoded-navbar'
    // 'menupos-static'
    //layoutType
  ];

  if (windowSize.width < 992 && collapseMenu) {
    navClass = [...navClass, 'mob-open'];
  } else if (collapseMenu) {
    navClass = [...navClass, 'navbar-collapsed'];
  }

  let navBarClass = ['navbar-wrapper'];

  let navContent = (
    <div className={navBarClass.join(' ')}>
      <NavLogo />
      <NavContent navigation={menuItems.items} />
      {/* <NavContent navigation={navigation.items} /> */}
    </div>
  );
  if (windowSize.width < 992) {
    navContent = (
      <div className="navbar-wrapper">
        <NavLogo />
        <NavContent navigation={menuItems.items} />
        {/* <NavContent navigation={navigation.items} /> */}
      </div>
    );
  }
  return (
    <React.Fragment>
      <nav className={navClass.join(' ')}>{navContent}</nav>
    </React.Fragment>
  );
};

export default Navigation;

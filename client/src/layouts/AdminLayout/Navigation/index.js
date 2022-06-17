import React, { useContext } from 'react';

import { ConfigContext } from '../../../contexts/ConfigContext';
import useWindowSize from '../../../hooks/useWindowSize';

import NavLogo from './NavLogo';
import NavContent from './NavContent';
import navigation, { teacherMenuItems } from '../../../menu-items';

const Navigation = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const windowSize = useWindowSize();

  // const scroll = () => {
  //     if (navFixedLayout && headerFixedLayout === false) {
  //         const main = document.querySelector('.pcoded-navbar');
  //         const el = document.querySelector('.pcoded-navbar.menupos-fixed');
  //         const scrollPosition = window.pageYOffset;
  //         if (scrollPosition > 60) {
  //             el.style.position = 'fixed';
  //             el.style.transition = 'none';
  //             el.style.marginTop = '0';
  //         } else {
  //             main.style.position = 'absolute';
  //             main.style.marginTop = '56px';
  //         }
  //     } else {
  //         document.querySelector('.pcoded-navbar').removeAttribute('style');
  //     }
  // };

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
      <NavContent navigation={teacherMenuItems.items} />
      {/* <NavContent navigation={navigation.items} /> */}
    </div>
  );
  if (windowSize.width < 992) {
    navContent = (
      <div className="navbar-wrapper">
        <NavLogo />
        <NavContent navigation={teacherMenuItems.items} />
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

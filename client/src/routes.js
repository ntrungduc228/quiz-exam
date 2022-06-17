import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import TeacherLayout from './layouts/TeacherLayout';

import { BASE_URL } from './config/constant';

// export const renderRoutes = (routes = []) => (
//   <Suspense fallback={<Loader />}>
//     <Switch>
//       {routes.map((route, i) => {
//         const Layout = route.layout || Fragment;
//         const Component = route.component;
//         return (
//           <Route
//             key={i}
//             path={route.path}
//             exact={route.exact}
//             render={(props) => <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>}
//           />
//         );
//       })}
//     </Switch>
//   </Suspense>
// );

export const renderRoutes = (routes = {}) => (
  <Suspense fallback={<Loader />}>
    <Switch>
      {routes.items &&
        routes.items.map((route, i) => {
          const Layout = routes.layout || Fragment;
          const Component = route.component;
          return <Route key={i} path={route.path} exact={route.exact} render={(props) => <Layout>{<Component {...props} />}</Layout>} />;
        })}
    </Switch>
  </Suspense>
);

export const teacherRoutes = {
  layout: TeacherLayout,
  items: [
    {
      path: '/question',
      exact: true,
      component: lazy(() => import('./views/teacher/Question'))
    }
  ]
};

// export const teacherRoutes = [
//   {
//     path: '/question',
//     layout: TeacherLayout,
//     exact: true,
//     component: lazy(() => import('./views/teacher/Question'))
//   }
// ];

export const adminRoutes = {
  layout: AdminLayout,
  items: [
    {
      exact: true,
      layout: AdminLayout,
      path: '/app/dashboard/default',
      component: lazy(() => import('./views/dashboard/DashDefault'))
    },
    {
      layout: AdminLayout,
      exact: true,
      path: '/basic/button',
      component: lazy(() => import('./views/ui-elements/basic/BasicButton'))
    },
    {
      layout: AdminLayout,
      exact: true,
      path: '/basic/badges',
      component: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
    },
    {
      layout: AdminLayout,
      exact: true,
      path: '/basic/breadcrumb',
      component: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
    },
    {
      layout: AdminLayout,
      exact: true,
      path: '/basic/pagination',
      component: lazy(() => import('./views/ui-elements/basic/BasicPagination'))
    },
    {
      layout: AdminLayout,
      exact: true,
      path: '/basic/collapse',
      component: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
    },
    {
      layout: AdminLayout,
      exact: true,
      path: '/basic/tabs-pills',
      component: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
    },
    {
      layout: AdminLayout,
      exact: true,
      path: '/basic/typography',
      component: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
    },
    {
      layout: AdminLayout,
      exact: true,
      path: '/forms/form-basic',
      component: lazy(() => import('./views/forms/FormsElements'))
    },
    {
      layout: AdminLayout,
      exact: true,
      path: '/tables/bootstrap',
      component: lazy(() => import('./views/tables/BootstrapTable'))
    },
    {
      layout: AdminLayout,
      exact: true,
      path: '/charts/nvd3',
      component: lazy(() => import('./views/charts/nvd3-chart'))
    },
    {
      layout: AdminLayout,
      exact: true,
      path: '/maps/google-map',
      component: lazy(() => import('./views/maps/GoogleMaps'))
    },
    {
      layout: AdminLayout,
      exact: true,
      path: '/sample-page',
      component: lazy(() => import('./views/extra/SamplePage'))
    }
    // {
    //   path: '*',
    //   layout: AdminLayout,
    //   exact: true,
    //   component: () => <Redirect to={BASE_URL} />
    // }
  ]
};

const routes = [
  {
    exact: true,
    path: '/auth/signin-1',
    component: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: true,
    path: '/auth/signup-1',
    component: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: true,
        path: '/app/dashboard/default',
        component: lazy(() => import('./views/dashboard/DashDefault'))
      },
      {
        exact: true,
        path: '/basic/button',
        component: lazy(() => import('./views/ui-elements/basic/BasicButton'))
      },
      {
        exact: true,
        path: '/basic/badges',
        component: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
      },
      {
        exact: true,
        path: '/basic/breadcrumb',
        component: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      },
      {
        exact: true,
        path: '/basic/pagination',
        component: lazy(() => import('./views/ui-elements/basic/BasicPagination'))
      },
      {
        exact: true,
        path: '/basic/collapse',
        component: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: true,
        path: '/basic/tabs-pills',
        component: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: true,
        path: '/basic/typography',
        component: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: true,
        path: '/forms/form-basic',
        component: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: true,
        path: '/tables/bootstrap',
        component: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: true,
        path: '/charts/nvd3',
        component: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: true,
        path: '/maps/google-map',
        component: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: true,
        path: '/sample-page',
        component: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: true,
        component: () => <Redirect to={BASE_URL} />
      }
    ]
  }
];

export default routes;

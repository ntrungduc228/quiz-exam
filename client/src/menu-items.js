export const studentMenuItems = {
  items: [
    {
      id: 'dashboard',
      title: 'Tổng quan',
      type: 'item',
      url: '/dashboard',
      icon: 'feather icon-home'
    }
  ]
};
export const teacherMenuItems = {
  items: [
    {
      id: 'dashboard',
      title: 'Tổng quan',
      type: 'item',
      url: '/teacher/dashboard',
      icon: 'feather icon-home'
    },
    {
      id: 'class',
      title: 'Lớp học',
      type: 'item',
      url: '/teacher/class',
      icon: 'feather icon-folder'
    },
    {
      id: 'student',
      title: 'Sinh viên',
      type: 'item',
      url: '/teacher/student',
      icon: 'feather icon-folder'
    },
    {
      id: 'subject',
      title: 'Môn học',
      type: 'item',
      url: '/teacher/subject',
      icon: 'feather icon-folder'
    },
    {
      id: 'question',
      title: 'Câu hỏi',
      type: 'item',
      url: '/teacher/question',
      icon: 'feather icon-folder'
    },
    {
      id: 'exam',
      title: 'Đề thi',
      type: 'item',
      url: '/teacher/exam',
      icon: 'feather icon-folder'
    },
    {
      id: 'result',
      title: 'Kết quả',
      type: 'item',
      url: '/teacher/score',
      icon: 'feather icon-folder'
    }
  ]
};
export const adminMenuItems = {
  items: [
    {
      id: 'dashboard',
      title: 'Tổng quan',
      type: 'item',
      url: '/admin/dashboard',
      icon: 'feather icon-home'
    },
    {
      id: 'class',
      title: 'Lớp học',
      type: 'item',
      url: '/admin/class',
      icon: 'feather icon-folder'
    },
    {
      id: 'teacher',
      title: 'Giảng viên',
      type: 'item',
      url: '/admin/teacher',
      icon: 'feather icon-folder'
    },
    {
      id: 'student',
      title: 'Sinh viên',
      type: 'item',
      url: '/admin/student',
      icon: 'feather icon-folder'
    },
    {
      id: 'subject',
      title: 'Môn học',
      type: 'item',
      url: '/admin/subject',
      icon: 'feather icon-folder'
    },
    {
      id: 'question',
      title: 'Câu hỏi',
      type: 'item',
      url: '/admin/question',
      icon: 'feather icon-folder'
    },
    {
      id: 'exam',
      title: 'Đề thi',
      type: 'item',
      url: '/admin/exam',
      icon: 'feather icon-folder'
    },
    {
      id: 'result',
      title: 'Kết quả',
      type: 'item',
      url: '/admin/result',
      icon: 'feather icon-folder'
    }
  ]
};

const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/app/dashboard/default',
          icon: 'feather icon-home'
        }
      ]
    },
    {
      id: 'ui-element',
      title: 'UI ELEMENT',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'basic',
          title: 'Component',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Button',
              type: 'item',
              url: '/basic/button'
            },
            {
              id: 'badges',
              title: 'Badges',
              type: 'item',
              url: '/basic/badges'
            },
            {
              id: 'breadcrumb',
              title: 'Breadcrumb',
              type: 'item',
              url: '/basic/breadcrumb'
            },
            {
              id: 'pagination',
              title: 'Pagination',
              type: 'item',
              url: '/basic/pagination'
            },
            {
              id: 'collapse',
              title: 'Collapse',
              type: 'item',
              url: '/basic/collapse'
            },
            {
              id: 'tabs-pills',
              title: 'Tabs & Pills',
              type: 'item',
              url: '/basic/tabs-pills'
            },
            {
              id: 'typography',
              title: 'Typography',
              type: 'item',
              url: '/basic/typography'
            }
          ]
        }
      ]
    },
    {
      id: 'forms-tables',
      title: 'Forms & Tables',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'forms',
          title: 'Form Elements',
          type: 'item',
          url: '/forms/form-basic',
          icon: 'feather icon-file-text'
        },
        {
          id: 'tables',
          title: 'Table',
          type: 'item',
          url: '/tables/bootstrap',
          icon: 'feather icon-server'
        }
      ]
    },
    {
      id: 'chart-maps',
      title: 'Chart & Maps',
      type: 'group',
      icon: 'icon-charts',
      children: [
        {
          id: 'charts',
          title: 'Charts',
          type: 'item',
          url: '/charts/nvd3',
          icon: 'feather icon-pie-chart'
        },
        {
          id: 'maps',
          title: 'Map',
          type: 'item',
          url: '/maps/google-map',
          icon: 'feather icon-map'
        }
      ]
    },
    {
      id: 'pages',
      title: 'Pages',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: 'feather icon-lock',
          badge: {
            title: 'New',
            type: 'label-danger'
          },
          children: [
            {
              id: 'signup-1',
              title: 'Sign up',
              type: 'item',
              url: '/auth/signup-1',
              target: true,
              breadcrumbs: false
            },

            {
              id: 'signin-1',
              title: 'Sign in',
              type: 'item',
              url: '/auth/signin-1',
              target: true,
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'sample-page',
          title: 'Sample Page',
          type: 'item',
          url: '/sample-page',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
        },
        {
          id: 'documentation',
          title: 'Documentation',
          type: 'item',
          icon: 'feather icon-help-circle',
          classes: 'nav-item',
          url: 'https://codedthemes.com/item/datta-able-react-free-admin-template/#',
          target: true,
          external: true
        },
        {
          id: 'menu-level',
          title: 'Menu Levels',
          type: 'collapse',
          icon: 'feather icon-menu',
          children: [
            {
              id: 'menu-level-1.1',
              title: 'Menu Level 1.1',
              type: 'item',
              url: '#!'
            },
            {
              id: 'menu-level-1.2',
              title: 'Menu Level 2.2',
              type: 'collapse',
              children: [
                {
                  id: 'menu-level-2.1',
                  title: 'Menu Level 2.1',
                  type: 'item',
                  url: '#'
                },
                {
                  id: 'menu-level-2.2',
                  title: 'Menu Level 2.2',
                  type: 'collapse',
                  children: [
                    {
                      id: 'menu-level-3.1',
                      title: 'Menu Level 3.1',
                      type: 'item',
                      url: '#'
                    },
                    {
                      id: 'menu-level-3.2',
                      title: 'Menu Level 3.2',
                      type: 'item',
                      url: '#'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'disabled-menu',
          title: 'Disabled Menu',
          type: 'item',
          url: '#',
          classes: 'nav-item disabled',
          icon: 'feather icon-power'
        }
      ]
    }
  ]
};

export default menuItems;

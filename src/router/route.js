const routes = [
  {
    path: "/",
    name: "Layout",
    redirect: "/",
    component: () => import("@/Layout/index.vue"),
    children: [
      {
        name: 'ListSchema',
        path: '/',
        component: () => import('@/views/pages/Schema.vue'),
      },
      {
        name: 'ListUsers',
        path: '/users',
        component: () => import('@/views/pages/Users.vue'),
      }
    ],
  },
];

export default routes;

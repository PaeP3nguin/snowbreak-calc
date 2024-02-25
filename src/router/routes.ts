import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // Redirect to calculator as default page
    redirect: { path: '/calculator' },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/calculator',
        component: () => import('pages/CalculatorPage.vue'),
      },
      {
        path: '/damage-formula',
        component: () => import('pages/DamageFormulaPage.vue'),
      },
      {
        path: '/enemy-info',
        component: () => import('pages/EnemyInfoPage.vue'),
      },
      {
        path: '/resources',
        component: () => import('pages/ResourcesPage.vue'),
      },
      {
        path: '/changelog',
        component: () => import('pages/ChangelogPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

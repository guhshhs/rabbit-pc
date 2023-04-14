import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/components/XtxLayout.vue'),
      children: [{
        path: '',
        component: () => import('@/views/home/home.vue')
      },
      {
        path: "category/:id",
        component: () => import("@/views/category/TopCategoryPage.vue")
      },
      {
        path: "category/sub/:top/:sub",
        component: () => import("@/views/category/SubCategoryPage.vue")
      },
      {
        path: '/goods/:id',
        component: () => import("@/views/goods/GoodsDetailPage.vue")
      }
      ]
    },
    {
      path: '/:catchAlll(.*)',
      name: 'error',
      component: () => import("@/views/error/Index.vue")
    }
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router

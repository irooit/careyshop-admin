import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/stats',
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      meta: { ...meta, cache: true, title: '数据首页' },
      component: () => import('@/views/stats/index')
    },
    {
      path: 'data/shop',
      name: `${pre}data-shop`,
      meta: { ...meta, cache: true, title: '店铺统计' },
      component: () => import('@/views/stats/shop')
    },
    {
      path: 'data/goods',
      name: `${pre}data-goods`,
      meta: { ...meta, cache: true, title: '商品统计' },
      component: () => import('@/views/stats/goods')
    },
    {
      path: 'data/order',
      name: `${pre}data-order`,
      meta: { ...meta, cache: true, title: '订单统计' },
      component: () => import('@/views/stats/order')
    },
    {
      path: 'data/client',
      name: `${pre}data-client`,
      meta: { ...meta, cache: true, title: '会员统计' },
      component: () => import('@/views/stats/client')
    }
  ])('stats-')
}

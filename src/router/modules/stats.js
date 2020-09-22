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
    }
  ])('stats-')
}

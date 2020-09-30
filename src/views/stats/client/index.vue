<template>
  <cs-container>
    <page-header
      slot="header"
      ref="header"
      :loading="loading"
      @submit="handleSubmit"/>

    <page-main
      :loading="loading"
      :today-data="todayData"
      :level-data="levelData"
      :login-data="loginData"
      :update-time="updateTime"/>
  </cs-container>
</template>

<script>
import { get } from 'lodash'
import { getStatsData } from '@/api/aided/stats'

export default {
  name: 'stats-data-client',
  components: {
    PageHeader: () => import('../index/components/PageHeader'),
    PageMain: () => import('./components/PageMain')
  },
  data() {
    return {
      loading: false,
      todayData: {},
      levelData: {
        columns: ['name', 'count'],
        rows: []
      },
      loginData: {
        columns: ['day', 'count'],
        rows: []
      },
      updateTime: ''
    }
  },
  mounted() {
    this.handleSubmit()
  },
  methods: {
    handleSubmit(form) {
      this.loading = true
      getStatsData({ type: 'client', ...form })
        .then(res => {
          this.todayData = get(res, 'data.today', {})
          this.levelData.rows = get(res, 'data.chart.level', [])
          this.loginData.rows = get(res, 'data.chart.login', [])
          this.updateTime = get(res, 'data.update_time')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

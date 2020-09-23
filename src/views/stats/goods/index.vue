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
        :chart-data="chartData"
        :top-data="topData"/>
  </cs-container>
</template>

<script>
import { get } from 'lodash'
import { getStatsData } from '@/api/aided/stats'

export default {
  name: 'stats-data-goods',
  components: {
    PageHeader: () => import('./components/PageHeader'),
    PageMain: () => import('./components/PageMain')
  },
  data() {
    return {
      loading: false,
      todayData: {},
      chartData: [],
      topData: []
    }
  },
  mounted() {
    // this.handleSubmit()
  },
  methods: {
    handleSubmit(form) {
      this.loading = true
      getStatsData({ type: 'goods', ...form })
        .then(res => {
          this.todayData = get(res, 'data.today', {})
          this.chartData = get(res, 'data.chart', [])
          this.topData = get(res, 'data.top', [])
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

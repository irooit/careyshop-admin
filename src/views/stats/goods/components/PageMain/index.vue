<template>
  <div class="cs-p">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="box-card-header">
        <span>今日实时</span>
      </div>

      <div>111</div>
    </el-card>

    <el-row :gutter="20" class="cs-mt">
      <el-col :span="14">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="box-card-header">
            <span>趋势</span>
          </div>

          <ve-line :data="chartData" :settings="chartSettings"/>
        </el-card>
      </el-col>

      <el-col :span="10">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="box-card-header">
            <span>热销 TOP</span>
          </div>

          <div>111</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import charts from '@/plugin/careyshop/charts'

export default {
  mixins: [
    charts
  ],
  props: {
    todayData: {
      default: () => {}
    },
    chartData: {
      default: () => {}
    },
    topData: {
      default: () => []
    }
  },
  data() {
    return {
      chartSettings: {
        labelMap: {
          day: '日期',
          sales: '销售量',
          views: '游览量'
        }
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .box-card {
    border-radius: 0;
    border: 1px solid #DCDFE6;
  }

  .box-card-header {
    font-size: 14px;
    color: #606266;
  }
</style>

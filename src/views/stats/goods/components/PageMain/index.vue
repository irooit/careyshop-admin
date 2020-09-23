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
        <el-table
          :data="topData"
          :header-cell-style="{padding: '9px 0'}"
          class="table-card">
          <el-table-column
            type="index"
            label="排行"
            width="50">
          </el-table-column>

          <el-table-column
            label="名称"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span
                @click="handleView(scope.row.goods_id)"
                class="link">{{scope.row.name}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="sales_sum"
            label="销售量"
            width="100">
          </el-table-column>
        </el-table>
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
    // 打开商品预览
    handleView(goods_id) {
      this.$router.push({
        name: 'goods-admin-view',
        params: { goods_id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-card {
    border-radius: 0;
    border: 1px solid $color-border-1;
  }

  .box-card-header {
    font-size: 14px;
    color: $color-text-normal;
  }

  .table-card {
    border: 1px solid $color-border-1;
    border-bottom: none;
  }

  .link {
    &:hover {
      cursor: pointer;
      color: $color-primary;
      text-decoration: underline;
    }
  }
</style>

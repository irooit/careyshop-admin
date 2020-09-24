<template>
  <div class="cs-p">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="box-card-header">
        <span>今日实时</span>
      </div>

      <div class="cs-today flex-wrap">
        <div
          v-for="(item, key) in todayData"
          :key="key"
          class="cs-today__block">
          <div class="cs-today__content">
            <div class="cs-today__info">
              <p>{{todayMap[key]}}</p>
              <p class="cs-today__number">{{item}}</p>
            </div>
          </div>
        </div>
      </div>
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
          :header-cell-style="{padding: '8px 0'}"
          class="table-card">
          <el-table-column
            type="index"
            label="排行"
            width="56">
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
            align="center"
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
      todayMap: {
        new: '新增数',
        online: '上架中',
        offline: '已下架',
        views: '游览量',
        sales: '销售数',
        collect: '收藏量'
      },
      chartSettings: {
        labelMap: {
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

  /deep/ td {
    padding: 10px;
  }
}

.link {
  &:hover {
    cursor: pointer;
    color: $color-primary;
    text-decoration: underline;
  }
}

.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
}

.cs-today {
  .cs-today__block {
    width: 16.6%;
    box-sizing: border-box;
  }

  .cs-today__content {
    display: flex;
    color: $color-info;
    border-radius: 4px;
    background-color: #F5F7FA;
    margin: 10px;
    overflow: hidden;
  }

  .cs-today__info {
    width: 100%;
    text-align: center;

    p {
      margin: 10px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .cs-today__number {
      color: $color-text-normal;
      font-size: 28px;
    }
  }
}
</style>

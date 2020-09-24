<template>
  <cs-container>
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
                <p class="cs-today__title">{{baseMap[key]}}</p>
                <p class="cs-today__number">{{item}}</p>
                <p class="cs-today__yesterday">昨日：{{yesterdayData[key]}}</p>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-row :gutter="20" class="cs-mt">
        <el-col :span="14">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="box-card-header">
              <span>实时订单</span>
            </div>

            <ve-histogram
              :data="orderHoursData"
              :settings="{labelMap: {today: '今天', yesterday: '昨天'}}"/>
          </el-card>
        </el-col>

        <el-col :span="10">
          <el-table
            :data="goodsData"
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

      <el-card class="box-card cs-mt" shadow="never">
        <div slot="header" class="box-card-header">
          <span>本月订单量</span>
        </div>

        <ve-line :data="orderMonthData" :settings="{labelMap: {count: '订单量合计'}}"/>
      </el-card>

      <el-card class="box-card cs-mt" shadow="never">
        <div slot="header" class="box-card-header">
          <span>本月会员数</span>
        </div>

        <ve-histogram :data="clientMonthData" :settings="{labelMap: {count: '会员数合计'}}"/>
      </el-card>
    </div>
  </cs-container>
</template>

<script>
import charts from '@/plugin/careyshop/charts'
import { getStatsData } from '@/api/aided/stats'

export default {
  name: 'stats-data-shop',
  mixins: [
    charts
  ],
  data() {
    return {
      baseMap: {
        order: '订单量',
        sales: '销售额',
        trade: '交易完成',
        goods: '新增商品数',
        collect: '新增收藏量',
        client: '新增会员数',
        service: '新增售后单',
        withdraw: '新增提现单'
      },
      goodsData: [],
      todayData: {},
      yesterdayData: {},
      orderHoursData: {
        columns: ['hour', 'today', 'yesterday'],
        rows: []
      },
      orderMonthData: {
        columns: ['day', 'count'],
        rows: []
      },
      clientMonthData: {
        columns: ['day', 'count'],
        rows: []
      }
    }
  },
  mounted() {
    this.handleSubmit()
  },
  methods: {
    // 请求数据
    handleSubmit() {
      getStatsData({ type: 'shop' })
        .then(res => {
          const data = res.data
          if (data) {
            this.goodsData = data.goods
            this.todayData = data.today
            this.yesterdayData = data.yesterday
            this.orderHoursData.rows = data.order_hours
            this.orderMonthData.rows = data.order_month
            this.clientMonthData.rows = data.client_month
          }
        })
    },
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
    width: 25%;
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

    .cs-today__title {
      color: $color-text-main;
    }

    .cs-today__number {
      color: $color-text-normal;
      font-size: 28px;
    }

    .cs-today__yesterday {
      font-size: 13px;
    }
  }
}
</style>

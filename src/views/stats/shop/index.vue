<template>
  <cs-container>
    <div class="cs-p">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="box-card-header">
          <span>基础数据</span>
        </div>

        <div>111</div>
      </el-card>

      <el-row :gutter="20" class="cs-mt">
        <el-col :span="14">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="box-card-header">
              <span>实时订单</span>
            </div>

            <div>111</div>
          </el-card>
        </el-col>

        <el-col :span="10">
          <div>222</div>
        </el-col>
      </el-row>

      <el-card class="box-card cs-mt" shadow="never">
        <div slot="header" class="box-card-header">
          <span>月订单量</span>
        </div>

        <div>111</div>
      </el-card>

      <el-card class="box-card cs-mt" shadow="never">
        <div slot="header" class="box-card-header">
          <span>月会员数</span>
        </div>

        <div>111</div>
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
        order: '订单数',
        sales: '销售额',
        trade: '交易完成',
        goods: '商品数',
        collect: '收藏量',
        client: '会员数',
        service: '售后单数',
        withdraw: '提现单数'
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
    width: 20%;
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

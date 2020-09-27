<template>
  <div class="cs-p">
    <div class="cs-card">
      <i class="el-icon-data-line cs-pb">
        <span class="cs-p-5">今日概况</span>
        <span class="cs-card-sub">统计日期：{{updateTime}}</span>
      </i>

      <i
        class="el-icon-refresh cs-card-sub cs-fr link"
        @click="handleRefresh">刷新</i>

      <el-row>
        <el-col
          v-for="(item, key) in todayData"
          class="cs-today"
          :key="key"
          :span="3">
          <div class="cs-today__icon cs-fcr cs-pr-10">
            <cs-icon :name="todayMap[key].icon"/>
          </div>

          <div class="cs-today__info" @click="handleOpen(todayMap[key].url)">
            <cs-count-up class="cs-today__number" :end="item"/>
            <span class="cs-today__desc">{{todayMap[key].name}}</span>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="20">
      <el-col :span="14">
        <div class="cs-card">
          <i class="el-icon-collection-tag cs-pb">
            <span class="cs-pl-5">订单状态</span>
          </i>
        </div>

        <div class="cs-card">
          <i class="el-icon-collection-tag cs-pb">
            <span class="cs-pl-5">今日订单量</span>
          </i>
          <ve-line
            :data="orderToday"
            :colors="colors"
            :settings="{labelMap: {count: '订单量合计'}}"/>
        </div>

        <div class="cs-card">
          <i class="el-icon-collection-tag cs-pb">
            <span class="cs-pl-5">今日活跃会员</span>
          </i>
          <ve-line
            :data="clientActive"
            :colors="colors"
            :settings="{labelMap: {count: '活跃数合计'}}"/>
        </div>

        <el-table
          :data="goodsTop"
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

      <el-col :span="10">
        <div class="cs-card">
          <i class="el-icon-collection-tag cs-pb">
            <span class="cs-pl-5">快捷入口</span>
          </i>

          <div>
            <el-button size="mini" plain @click="$open('careyshop.cn')">官方主页</el-button>
            <el-button size="mini" plain @click="$open('careyshop.cn/download.html')">版本发布</el-button>
            <el-button size="mini" plain @click="$open('doc.careyshop.cn')">文档中心</el-button>
            <el-button size="mini" plain @click="$open('github.com/dnyz520')">Github</el-button>
            <el-button size="mini" plain @click="$open('gitee.com/careyshop')">Gitee</el-button>
          </div>
        </div>

        <div class="cs-card">
          <i class="el-icon-collection-tag cs-pb">
            <span class="cs-pl-5">销售统计</span>
          </i>
        </div>

        <div class="cs-card">
          <i class="el-icon-collection-tag cs-pb">
            <span class="cs-pl-5">订单来源</span>
          </i>
          <ve-pie :data="orderSource" :colors="colors"/>
        </div>

        <div class="cs-card">
          <i class="el-icon-collection-tag cs-pb">
            <span class="cs-pl-5">会员等级</span>
          </i>
          <ve-ring :data="clientLevel" :colors="colors"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getStatsData } from '@/api/aided/stats'
import colors from '@/plugin/careyshop/charts'

export default {
  components: {
    VeLine: () => import('v-charts/lib/line.common'),
    VePie: () => import('v-charts/lib/pie.common'),
    VeRing: () => import('v-charts/lib/ring.common')
  },
  data() {
    return {
      colors,
      updateTime: '',
      todayData: {},
      todayMap: {
        order: { icon: 'RectangleCopy153', name: '订单数', url: 'order-admin-list' },
        trade: { icon: 'baoguo_dabao_o', name: '完成数', url: 'order-admin-list' },
        collect: { icon: 'shoucang_o', name: '收藏量', url: 'goods-admin-list' },
        client: { icon: 'RectangleCopy214', name: '新增会员', url: 'member-user-client' },
        service: { icon: 'fuwu_o', name: '售后单', url: 'order-service-list' },
        withdraw: { icon: 'jiekuan_o', name: '提现单', url: 'member-withdraw-list' },
        comment: { icon: 'RectangleCopy240', name: '评价待回复', url: 'goods-opinion-comment' },
        consult: { icon: 'wangwang_o', name: '咨询待回复', url: 'goods-opinion-consult' }
      },
      orderToday: {
        columns: ['hour', 'count'],
        rows: []
      },
      clientActive: {
        columns: ['hour', 'count'],
        rows: []
      },
      orderSource: {
        columns: ['name', 'count'],
        rows: []
      },
      clientLevel: {
        columns: ['name', 'count'],
        rows: []
      },
      goodsTop: []
    }
  },
  mounted() {
    this.handleSubmit()
  },
  methods: {
    handleSubmit() {
      getStatsData({ type: 'index' })
        .then(res => {
          const data = res.data
          if (data) {
            this.updateTime = data.update_time
            this.todayData = data.today_data
            this.orderToday.rows = data.order_today
            this.clientActive.rows = data.client_active
            this.orderSource.rows = data.order_source
            this.clientLevel.rows = data.client_level
            this.goodsTop = data.goods_top
          }
        })
    },
    handleOpen(name) {
      this.$router.push({ name })
    },
    handleView(goods_id) {
      this.$router.push({
        name: 'goods-admin-view',
        params: { goods_id }
      })
    },
    handleRefresh() {
      this.$router.push({ name: 'refresh' })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-card {
  border: 1px solid $color-border-1;
  border-bottom: none;

  /deep/ td {
    padding: 10px;
  }
}

.link:hover {
  cursor: pointer;
  color: $color-primary;
  text-decoration: underline;
}

.cs-card {
  color: $color-text-main;
  border: 1px solid $color-border-1;
  background: #FFF;
  font-size: 14px;
  position: relative;
  margin-bottom: 20px;
  padding: 20px;
}

.cs-card-sub {
  font-size: 12px;
  color: $color-info;
}

.cs-today {
  display: inline-flex;

  .cs-today__icon i {
    font-size: 40px;
    color: $color-info;
  }

  .cs-today__info {
    line-height: 25px;

    .cs-today__number {
      display: block;
      font-size: 24px;
    }

    .cs-today__desc {
      color: $color-info;
    }

    &:hover {
      cursor: pointer;
      color: $color-primary;
    }
  }
}
</style>

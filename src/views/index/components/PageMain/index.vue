<template>
  <div class="cs-p">
    <div class="cs-card">
      <i class="el-icon-collection-tag cs-pb">
        今日概况
        <span class="update-time">更新时间：{{updateTime}}</span>
      </i>

      <el-row>
        <el-col
          v-for="(item, key) in todayData"
          class="cs-today"
          :key="key"
          :span="3">
          <div class="cs-today__icon cs-pr-10">
            <cs-icon :name="todayMap[key].icon"/>
          </div>

          <div class="cs-today__info" @click="handleMenuSelect(todayMap[key].url)">
            <cs-count-up class="cs-today__number" :end="item"/>
            <div class="cs-today__desc">{{todayMap[key].name}}</div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import { getStatsData } from '@/api/aided/stats'
import menuMixin from '@/layout/header-aside/components/mixin/menu'

export default {
  data() {
    return {
      updateTime: '',
      todayData: {},
      todayMap: {
        order: { icon: 'RectangleCopy153', name: '订单数', url: '/order/admin/list' },
        trade: { icon: 'baoguo_dabao_o', name: '完成数', url: '/order/admin/list' },
        collect: { icon: 'shoucang_o', name: '收藏量', url: '/goods/admin/list' },
        client: { icon: 'RectangleCopy214', name: '新增会员', url: '/member/user/client' },
        service: { icon: 'fuwu_o', name: '售后单', url: '/order/service/list' },
        withdraw: { icon: 'jiekuan_o', name: '提现单', url: '/member/withdraw/list' },
        comment: { icon: 'RectangleCopy240', name: '评价待回复', url: '/goods/opinion/comment' },
        consult: { icon: 'wangwang_o', name: '咨询待回复', url: '/goods/opinion/consult' }
      }
    }
  },
  mixins: [
    menuMixin
  ],
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
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.update-time {
  font-size: 12px;
  color: $color-info;
}

.cs-card {
  color: $color-text-main;
  border: 1px solid $color-border-1;
  background: #FFF;
  font-size: 14px;
  position: relative;
  padding: 20px;
}

.cs-today {
  display: inline-flex;

  .cs-today__icon {
    @extend %flex-center-row;

    i {
      font-size: 40px;
      color: $color-info;
    }
  }

  .cs-today__info:hover{
    cursor: pointer;
    color: $color-primary;
  }

  .cs-today__number {
    display: block;
    font-size: 24px;
  }

  .cs-today__desc {
    color: $color-info;
  }
}
</style>

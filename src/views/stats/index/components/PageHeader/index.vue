<template>
  <el-form
      :inline="true"
      :model="form"
      ref="form"
      size="mini"
      style="margin-bottom: -18px;">
    <el-form-item label="日期选择" prop="time_period">
      <el-date-picker
          v-model="form.time_period"
          type="daterange"
          range-separator="至"
          start-placeholder="起始日期"
          end-placeholder="截止日期"
          :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>

    <el-form-item>
      <el-button
          type="primary"
          icon="el-icon-search"
          :disabled="loading"
          @click="handleFormSubmit">查询</el-button>
    </el-form-item>

    <el-form-item>
      <el-button
          icon="el-icon-refresh"
          @click="handleFormReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    loading: {
      default: false
    }
  },
  data() {
    return {
      form: {
        begin_time: undefined,
        end_time: undefined,
        time_period: undefined
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 29)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 89)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  methods: {
    handleFormSubmit() {
      let form = {}
      if (this.form.time_period && this.form.time_period.length === 2) {
        form.begin_time = dayjs(this.form.time_period[0]).format('YYYY-MM-DD 00:00:00')
        form.end_time = dayjs(this.form.time_period[1]).format('YYYY-MM-DD 23:59:59')
      }

      this.$emit('submit', form)
    },
    handleFormReset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

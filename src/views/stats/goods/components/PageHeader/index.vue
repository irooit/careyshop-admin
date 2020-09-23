<template>
  <el-form
      :inline="true"
      :model="form"
      ref="form"
      size="mini"
      style="margin-bottom: -18px;">
    <el-form-item label="日期选择" prop="time_period">
      <el-date-picker
          v-model="timePeriod"
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
        end_time: undefined
      },
      timePeriod: null,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  methods: {
    handleFormSubmit() {
      if (!this.timePeriod || this.timePeriod.length !== 2) {
        this.form = {}
        return
      }

      this.form.begin_time = dayjs(this.timePeriod[0]).format('YYYY-MM-DD 00:00:00')
      this.form.end_time = dayjs(this.timePeriod[1]).format('YYYY-MM-DD 23:59:59')
      console.log(this.form)
    },
    handleFormReset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

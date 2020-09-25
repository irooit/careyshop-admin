<template>
  <div class="title">
    <span>CareyShop 商城后台管理系统集成方案</span>
    <el-divider direction="vertical"></el-divider>
    <span>版本号：{{$version}}</span>
    <el-divider direction="vertical"></el-divider>
    <span>Build：{{$buildTime}}</span>

    <div class="contact">
      <span @click="$open('shang.qq.com/wpa/qunwpa?idkey=3fe095a4a8c53953990860f53bbef1145f8c85658a55a0539066fd6d4f153417')">交流群（QQ）：714593455</span>
      <span @click="$open('wpa.qq.com/msgrd?v=3&uin=252404501&site=qq&menu=yes')">联系QQ：252404501</span>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.title {
  font-size: 13px;
  color: #909399;
}

.contact {
  display: inline;
  float: right;
}

.contact span {
  color: #606266;
  padding-left: 10px;
}

.contact span:hover {
  color: #409EFF;
  cursor: pointer;
}
</style>

<template>
  <cs-container :is-back="false">
    <page-header slot="header"/>
    <page-main/>
  </cs-container>
</template>

<script>
export default {
  name: 'index',
  components: {
    PageHeader: () => import('./components/PageHeader'),
    PageMain: () => import('./components/PageMain')
  }
}
</script>

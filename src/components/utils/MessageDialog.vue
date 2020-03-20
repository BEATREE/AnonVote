<template id="messageComponent">
  <div>
    <ul>
      <li>
        <b>标题：</b>
        {{ message.title }}
      </li>
      <li>
        <b>来源：</b>
        {{ message.fromUserName }}
      </li>
      <li>
        <b>时间：</b>
        {{ message.time }}
      </li>
      <li>
        <b>内容：</b>
        {{ message.content }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MessageDialog',
  data() {
    return {}
  },
  props: ['message'],
}
</script>

<style lang="scss" scoped>
ul{
  margin-top: 0px;
}
li{
    margin-bottom: 6px;
}
</style>

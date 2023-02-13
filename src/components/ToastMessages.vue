<template>
<div class="toast-container position-absolute pe-3 top-0 end-0">
  <Toast v-for="(msg, key) in messages" :key="key" :msg="msg"></Toast>
</div>
</template>

<script>
import Toast from '@/components/ToastList.vue'


export default {
  components: { Toast },
  data() {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  mounted() {
    this.emitter.on('push-message', (message) => {
      console.log('這是傳來的', message)
      console.log('顯示資料', this.messages)
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
    })
  }
}
</script>

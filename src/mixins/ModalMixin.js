import Modal from 'bootstrap/js/dist/modal'

export default {
  methods: {
    showModal () {
      this.Modal.show()
    },
    hideModal () {
      this.Modal.hide()
    }
  },
  mounted () {
  // 把Modal 實體化
    this.Modal = new Modal(this.$refs.modal)
  }
}

<template>
  <div class="container">
    <TransactionCard
      :myTransactions="myTransactions"
      @order_received="order_received"
      @fetchDataTransaction="fetchDataTransaction"
    ></TransactionCard>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import myServer from '../api/myServer.js'
import TransactionCard from '../components/TransactionCard.vue'

export default {
  data () {
    return {
      myTransactions: []
    }
  },
  components: {
    TransactionCard
  },
  methods: {
    order_received (id) {
      // console.log('order_received')
      myServer
        .put(`/transactions/customer/${id}`, {
          status: 'PESANAN SELESAI'
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          let myTransTemp = this.myTransactions
          myTransTemp.map(el => {
            if (el._id === data._id) {
              el.status = data.status
            }
          })
          // this.$store.commit('addnotifAdmin')
          this.myTransactions = myTransTemp
          // console.log(myTransTemp)
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data}`
          })
        })
    },
    fetchDataTransaction () {
      myServer
        .get(`/transactions/${localStorage.getItem('id')}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.myTransactions = data
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data}`
          })
        })
    }
  },
  created () {
    this.fetchDataTransaction()
  }
}
</script>

<style>
</style>


import { defineStore } from 'pinia'

export const useCounter = defineStore('counter', {
  state: () => ({
    n: 2,
    incrementedTimes: 0,
    decrementedTimes: 0,
    numbers: [] as number[],
  }),

  getters: {
    double: (state) => state.n * 2,
  },

  actions: {
    increment(amount = 1) {
      this.incrementedTimes++
      this.n += amount
    },

    changeMe() {
      console.log('change me to test HMR')
    },

    async fail() {
      const n = this.n
      this.numbers.push(n)
      if (this.n !== n) {
        throw new Error('Someone changed n!')
      }

      return n
    },

    async decrementToZero(interval: number = 300) {
      if (this.n <= 0) return

      while (this.n > 0) {
        this.$patch((state) => {
          state.n--
          state.decrementedTimes++
        })
      }
    },
  },
})
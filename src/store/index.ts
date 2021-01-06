import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null'),
    isCollapse: JSON.parse(window.localStorage.getItem('isCollapse') || 'true') // 菜单栏是否折叠
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      window.localStorage.setItem('user', payload)
    },
    setIsCollapse (state, payload) {
      state.isCollapse = payload
      window.localStorage.setItem('isCollapse', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})

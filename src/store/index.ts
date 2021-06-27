import { createStore } from 'vuex'

export default createStore({
  modules: {
  },
  state: {
    tabsList: []
  },
  mutations: {
    updateTabsList (state, data) {
      state.tabsList = data
    },
    addTab (state, data) {
      state.tabsList.push(data)
    },
    delTab (state, index) {
      state.tabsList.splice(index, 1)
    },
    clearTabs (state) {
      state.tabsList = []
    }
  },
  actions: {

  }
})

let nextId = 1;

const state = {
  notifications: []
}

const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++
    })
  },

  DELETE(state, notificationToRemove) {

    state.notifications = state.notifications.filter(val =>
      val.id !== notificationToRemove.id
    )
  }
}

const actions = {
  add({commit}, notification) {
    commit('PUSH', notification)
  },
  remove({commit}, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  }
}

export default {
  namespaced: true, // <== make sure this is defined
  actions,
  mutations,
  state
}

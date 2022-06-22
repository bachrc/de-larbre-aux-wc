// store.ts
import { createStore, Store } from 'vuex'
import { ApplicationState } from './models'
import { mutations } from './mutations'

export const store = createStore<ApplicationState>({
  state: new ApplicationState(),
  mutations
})

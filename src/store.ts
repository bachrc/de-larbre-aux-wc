// store.ts
import { createStore, Store } from 'vuex'
import { ApplicationState, Extraction } from './models'
import { mutations } from './mutations'

export const store = createStore<ApplicationState>({
  state: new ApplicationState(),
  mutations,
  getters: {
    getExtractionById: (state: ApplicationState) => (id: string): Extraction | undefined => state.extractions[id]
  }
})

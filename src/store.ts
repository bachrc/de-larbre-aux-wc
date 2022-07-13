// store.ts
import { createStore, Store } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { ApplicationState, Extraction } from './models'
import { mutations } from './mutations'

const vuexLocal = new VuexPersistence<ApplicationState>({
  storage: window.localStorage
})

export const store = createStore<ApplicationState>({
  state: new ApplicationState(),
  mutations,
  getters: {
    getExtractionById: (state: ApplicationState) => (id: string): Extraction | undefined => state.extractions[id],
    getRelevesFromExtraction: (state: ApplicationState, getters) => (extractionId: string): number[] | undefined => getters.getExtractionById(extractionId)?.relevesTDS
  },
  //plugins: [vuexLocal.plugin],
  strict: process.env.NODE_ENV !== 'production'
})

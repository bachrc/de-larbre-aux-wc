// store.ts
import Vue from 'vue'
import Vuex from 'vuex'
import { createStore, Store } from 'vuex'
import { ApplicationState } from './models/State'
import { mutations } from './mutations'
import createPersistedState from "vuex-persistedstate";
import { Extraction } from './models/Extraction'

export const store = createStore<ApplicationState>({
  state: new ApplicationState(),
  mutations,
  getters: {
    getExtractionById: (state: ApplicationState) => (id: string): Extraction | undefined => state.extractions[id],
    getRelevesFromExtraction: (state: ApplicationState, getters) => (extractionId: string): number[] | undefined => getters.getExtractionById(extractionId)?.relevesTDS
  },
  plugins: [createPersistedState()],
  strict: process.env.NODE_ENV !== 'production'
})

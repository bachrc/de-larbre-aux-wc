import { Store } from 'vuex'
import { ApplicationState } from './models'

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<ApplicationState>
  }
}

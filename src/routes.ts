import EditExtraction from "./components/EditExtraction/EditExtraction.vue"
import ExtractionsList from "./components/ExtractionsList/ExtractionsList.vue"

export const routes = [
    { path: '/', component: ExtractionsList },
    { path: '/extractions/:id', name: 'extraction', component: EditExtraction },
  ]
  
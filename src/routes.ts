import EditExtraction from "./components/extractions/EditExtraction.vue"
import ExtractionsList from "./components/extractions/ExtractionsList.vue"

export const routes = [
    { path: '/', component: ExtractionsList },
    { path: '/extractions/:id', name: 'extraction', component: EditExtraction },
  ]
  
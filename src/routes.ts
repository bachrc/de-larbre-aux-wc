import EditExtraction from "./components/extractions/EditExtraction.vue"
import ExtractionsList from "./components/extractions/ExtractionsList.vue"
import LoadData from "./components/extractions/LoadData.vue"

export const routes = [
    { path: '/', component: ExtractionsList },
    { path: '/extractions/:id', name: 'extraction', component: EditExtraction },
    { path: '/save', name: 'save', component: LoadData },
  ]
  
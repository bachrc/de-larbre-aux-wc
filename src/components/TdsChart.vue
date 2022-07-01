<script lang="ts">
import { defineComponent } from "vue"
import { Scatter } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { Extraction } from "../models"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

class Releve {
  private releveTds: number;
  private poidsCafe: number;
  private poidsBoisson: number;

  constructor(releveTds: number, poidsCafe: number, poidsBoisson: number) {
    this.releveTds = releveTds;
    this.poidsCafe = poidsCafe;
    this.poidsBoisson = poidsBoisson;
  }

  get yield(): number {
    return this.releveTds * (this.poidsCafe / this.poidsBoisson)
  }
}

export default defineComponent({
  components: { Scatter },
  props: {
    extractionId: {
      type: String,
      required: true
    }
  },
  computed: {
    extraction(): Extraction {
      return this.$store.getters.getExtractionById(this.extractionId)
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true
      },
      plugins: [],
      datasetIdKey: "tds",
      cssClasses: "",
      styles: {},
      chartData: {
        datasets: [{
          data: [{ x: 1, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 6 }, { x: 6, y: 9 }],
          showLine: true
        }]
      },
    }
  }
})

</script>

<template>
  <Scatter :chart-options="chartOptions" :chart-data="chartData" chart-id="tds-chart" :dataset-id-key="datasetIdKey"
    :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width=400 :height=400 />
</template>
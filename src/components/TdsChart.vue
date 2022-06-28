<script lang="ts">
import { defineComponent } from "vue"
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import {Extraction} from "../models"

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
    components: {Line},
    props: {
        extractionId: {
            type: String,
            required: true
        }
    },
    computed: {
        extraction() : Extraction {
            return this.$store.getters.getExtractionById(this.extractionId)
        }
    },
    data() {
        return {
            chartOptions: {
                responsive: true
            },
            plugins : [],
            datasetIdKey: "tds",
            cssClasses: "",
            styles: {},
            chartData: {
                labels: [ 'January', 'February', 'March' ],
                datasets: [ { data: [40, 20, 12] } ]
            },
        }
    }
})

</script>

<template>
    <Line
        :chart-options="chartOptions"
        :chart-data="chartData"
        chart-id="tds-chart"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width=400
        :height=400
    />
</template>
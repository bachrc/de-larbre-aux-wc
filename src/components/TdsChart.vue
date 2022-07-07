<script lang="ts">
import { defineComponent } from "vue"
import { Scatter } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { Extraction } from "../models"
import { TChartData } from "vue-chartjs/dist/types"
import annotationPlugin from 'chartjs-plugin-annotation';


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, annotationPlugin)

class Releve {
    poidsCafe: number;
    poidsBoisson: number;
    releveTds: number;

    constructor(releveTds: number, poidsCafe: number, poidsBoisson: number) {
        this.releveTds = releveTds;
        this.poidsCafe = poidsCafe;
        this.poidsBoisson = poidsBoisson;
    }

    get yield(): number {
        return this.releveTds * (this.poidsBoisson / this.poidsCafe)
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
        },
        releves(): Releve[] {
            let extraction = this.extraction;

            return extraction.relevesTDS.map(releve => new Releve(releve, extraction.poidsCafe, extraction.poidsBoisson))
        },
        datasets(): TChartData<"scatter", Releve[]> {
            return {
                datasets: [{
                    data: this.releves,
                    showLine: true
                }]
            }
        }
    },
    methods: {
        debug() {
            console.log(this.releves.map(r => r.yield))
        }
    },
    data() {
        return {
            chartOptions: {
                responsive: true,
                parsing: {
                    xAxisKey: 'yield',
                    yAxisKey: 'releveTds'
                },
                scales: {
                    xAxes: {
                        min: 14,
                        max: 26,
                        ticks: {
                            display: true,
                            stacked: true,
                            callback: function (value: number) {
                                return value + "%"
                            }
                        },
                        title: {
                            display: true,
                            text: "Yield"
                        }
                    },
                    yAxes: {
                        min: 0.9,
                        max: 1.8,
                        ticks: {
                            display: true,
                            stacked: true,
                            callback: function (value: number) {
                                return value + "%"
                            }
                        },
                        title: {
                            display: true,
                            text: "TDS"
                        }
                    }
                }
            },
            plugins: [],
            datasetIdKey: "tds",
            cssClasses: "",
            styles: {},
            chartData: {
                datasets: [{
                    data: [{
                        x: 0.5,
                        y: 0.5
                    }],
                    showLine: true
                }]
            },
        }
    }
})

</script>

<template>
    <Scatter :chart-options="chartOptions" :chart-data="datasets" chart-id="tds-chart" :dataset-id-key="datasetIdKey"
        :plugins="plugins" :css-classes="cssClasses" :styles="styles" ref="tdschart" :width=400 :height=400 />
    <span v-on:click="debug()">Aled</span>
</template>
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
        chartData(): TChartData<"scatter", Releve[]> {
            return {
                datasets: [{
                    data: this.releves,
                    showLine: true
                }]
            }
        },
        chartOptions(): any {
            return {
                plugins: {
                    autocolors: false,
                    annotation: {
                        annotations: {
                            weak_and_underextracted: {
                                type: 'box',
                                xMin: 0,
                                xMax: 18,
                                yMin: 0,
                                yMax: 1.15,
                                backgroundColor: 'rgba(255, 99, 132, 0.25)'
                            },
                            underextracted: {
                                type: 'box',
                                xMin: 0,
                                xMax: 18,
                                yMin: 1.15,
                                yMax: 1.45,
                                backgroundColor: 'rgba(255, 99, 132, 0.25)'
                            },
                            strong_and_underextracted: {
                                type: 'box',
                                xMin: 0,
                                xMax: 18,
                                yMin: 1.45,
                                yMax: 2,
                                backgroundColor: 'rgba(255, 99, 132, 0.25)'
                            },
                            weak: {
                                type: 'box',
                                xMin: 18,
                                xMax: 22,
                                yMin: 0,
                                yMax: 1.15,
                                backgroundColor: 'rgba(255, 99, 132, 0.25)'
                            },
                            ideal: {
                                type: 'box',
                                xMin: 18,
                                xMax: 22,
                                yMin: 1.15,
                                yMax: 1.45,
                                backgroundColor: 'rgba(255, 99, 132, 0.25)'
                            },
                            strong: {
                                type: 'box',
                                xMin: 18,
                                xMax: 22,
                                yMin: 1.45,
                                yMax: 2,
                                backgroundColor: 'rgba(255, 99, 132, 0.25)'
                            },
                            weak_and_overextracted: {
                                type: 'box',
                                xMin: 22,
                                xMax: 30,
                                yMin: 0,
                                yMax: 1.15,
                                backgroundColor: 'rgba(255, 99, 132, 0.25)'
                            },
                            overextracted: {
                                type: 'box',
                                xMin: 22,
                                xMax: 30,
                                yMin: 1.15,
                                yMax: 1.45,
                                backgroundColor: 'rgba(255, 99, 132, 0.25)'
                            },
                            strong_and_overextracted: {
                                type: 'box',
                                xMin: 22,
                                xMax: 30,
                                yMin: 1.45,
                                yMax: 2,
                                backgroundColor: 'rgba(255, 99, 132, 0.25)'
                            }
                        }
                    }
                },
                responsive: true,
                parsing: {
                    xAxisKey: 'yield',
                    yAxisKey: 'releveTds'
                },
                scales: {
                    x: {
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
                    y: {
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
            plugins: [annotationPlugin],
            datasetIdKey: "tds",
            cssClasses: "",
            styles: {},
        }
    }
})

</script>

<template>
    <Scatter :chart-options="chartOptions" :chart-data="chartData" chart-id="tds-chart" :dataset-id-key="datasetIdKey"
        :css-classes="cssClasses" :styles="styles" ref="tdschart" :width=400 :height=400 />
    <span v-on:click="debug()">Aled</span>
</template>
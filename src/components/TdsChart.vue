<script lang="ts">
import { defineComponent } from "vue"
import { Scatter } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation';
import { averageReleve, computeReleves, Extraction } from "../models/Extraction";
import { Releve } from "../models/Releve";
import { Extractions } from "../models/State";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, annotationPlugin)

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
            return computeReleves(this.extraction)
        },
        otherExtractions(): Extraction[] {
            return this.$store.getters.getExtractionsButId(this.extractionId);
        },
        chartData(): any {
            console.log(averageReleve(this.extraction))
            return {
                datasets: [{
                    label: "Extraction",
                    backgroundColor: "rgba(150, 0, 200, 0.8)",
                    borderColor: "rgba(150, 0, 200, 0.8)",
                    data: this.releves,
                    showLine: true
                }, {
                    label: "TDS Moyen",
                    backgroundColor: "rgba(254, 70, 255, 1)",
                    borderColor: "rgba(254, 70, 255, 1)",
                    data: [averageReleve(this.extraction)],
                    radius: 6
                }, {
                    label: "Autres relevés",
                    backgroundColor: "rgba(155, 155, 155, 0.8)",
                    borderColor: "rgba(155, 155, 155, 0.8)",
                    data: Object.values(this.extractionsToCompare).map(averageReleve),
                    radius: 5
                }]
            }
        },
        chartOptions(): any {
            return {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context: any) {
                                switch (context.dataset.label) {
                                    case "Extraction":
                                        return "Relevé " + (context.dataIndex + 1);
                                    case "TDS Moyen":
                                        return "TDS Moyen";
                                    case "Autres relevés":
                                        return context.raw.nom
                                }
                            }
                        }
                    },
                    autocolors: false,
                    animation: false,
                    annotation: {
                        annotations: {
                            weak_and_underextracted: {
                                type: 'box',
                                xMin: 0,
                                xMax: 18,
                                yMin: 0,
                                yMax: 1.15,
                                backgroundColor: 'rgba(0, 125, 200, 0.20)'
                            },
                            underextracted: {
                                type: 'box',
                                xMin: 0,
                                xMax: 18,
                                yMin: 1.15,
                                yMax: 1.45,
                                backgroundColor: 'rgba(0, 125, 200, 0.40)'
                            },
                            strong_and_underextracted: {
                                type: 'box',
                                xMin: 0,
                                xMax: 18,
                                yMin: 1.45,
                                yMax: 2,
                                backgroundColor: 'rgba(0, 125, 200, 0.60)'
                            },
                            weak: {
                                type: 'box',
                                xMin: 18,
                                xMax: 22,
                                yMin: 0,
                                yMax: 1.15,
                                backgroundColor: 'rgba(39, 212, 82, 0.2)'
                            },
                            ideal: {
                                type: 'box',
                                xMin: 18,
                                xMax: 22,
                                yMin: 1.15,
                                yMax: 1.45,
                                backgroundColor: 'rgba(39, 212, 82, 0.4)'
                            },
                            strong: {
                                type: 'box',
                                xMin: 18,
                                xMax: 22,
                                yMin: 1.45,
                                yMax: 2,
                                backgroundColor: 'rgba(39, 212, 82, 0.6)'
                            },
                            weak_and_overextracted: {
                                type: 'box',
                                xMin: 22,
                                xMax: 30,
                                yMin: 0,
                                yMax: 1.15,
                                backgroundColor: 'rgba(200, 75, 0, 0.2)'
                            },
                            overextracted: {
                                type: 'box',
                                xMin: 22,
                                xMax: 30,
                                yMin: 1.15,
                                yMax: 1.45,
                                backgroundColor: 'rgba(200, 75, 0, 0.4)'
                            },
                            strong_and_overextracted: {
                                type: 'box',
                                xMin: 22,
                                xMax: 30,
                                yMin: 1.45,
                                yMax: 2,
                                backgroundColor: 'rgba(200, 75, 0, 0.6)'
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
    data() {
        return {
            extractionsToCompare: {} as Extractions,
            plugins: [annotationPlugin],
            datasetIdKey: "tds",
            cssClasses: "",
            styles: {},
        }
    },
    methods: {
        toggleExtractionToComparison(extraction: Extraction) {
            if (extraction.id in this.extractionsToCompare) {
                delete this.extractionsToCompare[extraction.id];
            } else {
                this.extractionsToCompare[extraction.id] = extraction;
            }

        }
    }
})

</script>

<template>
    <Scatter :chart-options="chartOptions" :chart-data="chartData" chart-id="tds-chart" :dataset-id-key="datasetIdKey"
        :css-classes="cssClasses" :styles="styles" ref="tdschart" />

    <div v-for="extraction in otherExtractions">
        <input type="checkbox" :checked="extraction.id in extractionsToCompare"
            v-on:input="_ => toggleExtractionToComparison(extraction)" />
        <span>
            {{ extraction.name }}
        </span>
    </div>

</template>
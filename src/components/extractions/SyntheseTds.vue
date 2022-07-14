<script lang="ts">
import { defineComponent } from "vue";
import { computeReleves } from "../../models/Extraction";
import { Releve } from "../../models/Releve";
import { computeYield } from "../../models/Extraction";

export default defineComponent({
    props: {
        extractionId: {
            type: String,
            required: true
        }
    },
    computed: {
        extraction() {
            return this.$store.getters.getExtractionById(this.extractionId)
        },
        releves(): Releve[] {
            return computeReleves(this.extraction)
        },
        yield(): number {
            return computeYield(this.extraction)
        }
    }
})
</script>

<template >
    <div class="flex flex-col place-content-center">
        <span>Le yield moyen est de {{ yield }}%</span>
    </div>
</template>
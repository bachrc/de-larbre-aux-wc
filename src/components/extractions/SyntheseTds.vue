<script lang="ts">
import { defineComponent } from "vue";
import { computeReleves } from "../../models/Extraction";
import { Releve } from "../../models/Releve";

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
        }
    }
})
</script>

<template>
    <div class="flex flex-col">
        <span v-for="(releve, index) in releves">
            Yield {{ index + 1 }} : {{ releve.yield }}
        </span>
        <span v-if="extraction.yield">Le yield moyen est de {{ extraction.yield }}</span>
    </div>
</template>
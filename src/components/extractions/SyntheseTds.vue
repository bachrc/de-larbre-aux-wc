<script lang="ts">
import { defineComponent } from "vue";

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
        }
    }
})
</script>

<template>
    <div class="flex flex-col">
        <span v-for="(releve, index) in extraction.computeReleves()">
            Yield {{ index + 1 }} : {{ releve.yield }}
        </span>
        <span>Le yield moyen est de {{ extraction.yield }}</span>
    </div>
</template>
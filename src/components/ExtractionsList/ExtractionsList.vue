<script lang="ts">
import { defineComponent } from "vue"
import { Extractions } from "../../models"
import { MutationType } from "../../mutations"

export default defineComponent({
    computed: {
        extractions(): Extractions {
            return this.$store.state.extractions
        }
    },
    methods: {
        addExtraction() {
            this.$store.commit(MutationType.ADD_EXTRACTION);
        }
    }
})
</script>

<template>
<div class="flex flex-col">
    
    <a href="#" @click="addExtraction" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> Nouvelle extraction </a>
    <div>
        <div v-for="extraction in extractions">
            <router-link :to="{ name: 'extraction', params: { id: extraction.id }}">{{ extraction.id }}</router-link>
        </div>
    </div>
</div>
</template>
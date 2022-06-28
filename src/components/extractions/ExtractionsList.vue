<script lang="ts">
import { defineComponent } from "vue"
import { Extractions } from "../../models"
import { MutationType } from "../../mutations"
import Button from "../common/Button.vue"

export default defineComponent({
    computed: {
        extractions(): Extractions {
            return this.$store.state.extractions;
        }
    },
    methods: {
        addExtraction() {
            this.$store.commit(MutationType.ADD_EXTRACTION);
        }
    },
    components: { Button }
})
</script>

<template>
<div class="flex flex-col">  
    <Button text="Ajouter une extraction" @click="addExtraction"></Button>
    <div>
        <div v-for="extraction in extractions">
            <router-link :to="{ name: 'extraction', params: { id: extraction.id }}">{{ extraction.id }}</router-link>
        </div>
    </div>
</div>
</template>
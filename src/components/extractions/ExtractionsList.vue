<script lang="ts">
import { defineComponent } from "vue"
import { Extractions } from "../../models/State"
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
        },
        deleteExtraction(extractionId: string) {
            this.$store.commit(MutationType.DELETE_EXTRACTION, { extractionId })
        }
    },
    components: { Button }
})
</script>
    
<template>
    <div class="flex flex-col">
        <Button text="Ajouter une extraction" @click="addExtraction"></Button>
        <div>
            <div v-for="extraction in extractions" class="flex flex-row px-8 items-baseline">
                <router-link :to="{ name: 'extraction', params: { id: extraction.id } }">
                    <span class="text-2xl">{{ extraction.name }}</span>
                </router-link>
                <div class="grow"></div>
                <font-awesome-icon class="h-6" icon="fa-solid fa-trash" @click="deleteExtraction(extraction.id)" />
            </div>
        </div>
    </div>
</template>
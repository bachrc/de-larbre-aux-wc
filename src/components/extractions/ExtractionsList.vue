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
        },
        deleteExtraction(extractionId: string) {
            this.$store.commit(MutationType.DELETE_EXTRACTION, { extractionId })
        },
        deleteAllExtractions() {
            this.$store.commit(MutationType.DELETE_ALL_EXTRACTIONS)
        }
    },
    components: { Button }
})
</script>

<template>
    <div class="flex flex-col">
        <Button text="Ajouter une extraction" @click="addExtraction"></Button>
        <Button text="Tout supprimer" @click="deleteAllExtractions"></Button>
        <div>
            <div v-for="extraction in extractions">
                <router-link :to="{ name: 'extraction', params: { id: extraction.id } }">
                    {{ extraction.name }}
                </router-link>
                <font-awesome-icon icon="fa-solid fa-trash" @click="deleteExtraction(extraction.id)" />
            </div>
        </div>
    </div>
</template>
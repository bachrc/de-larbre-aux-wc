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
        <div class="flex flex-row">
            <Button text="Sauvegarder les données" class="w-1/2" />
            <Button text="Ajouter une extraction" class="w-1/2" @click="addExtraction"></Button>
        </div>

        <div class="flex flex-row">
            <div class="w-1/2 px-8">
                <p class="text-3xl mb-8">
                    De l'Arbre aux WC ! En passant par le café.
                </p>
                <p class="text-2xl text-justify">
                    Cette application, réservée pour le café de spécialité, permet de renseigner vos relevés TDS
                    afin de situer votre extraction sur les normes du SCA (Speciality Coffee Association).
                </p>
            </div>
            <div class="w-1/2">
                <div v-for="extraction in extractions" class="flex flex-row px-8 items-baseline">
                    <router-link :to="{ name: 'extraction', params: { id: extraction.id } }">
                        <span class="text-2xl">{{ extraction.name }}</span>
                    </router-link>
                    <div class="grow"></div>
                    <font-awesome-icon class="h-6" icon="fa-solid fa-trash" @click="deleteExtraction(extraction.id)" />
                </div>
            </div>
        </div>
    </div>
</template>
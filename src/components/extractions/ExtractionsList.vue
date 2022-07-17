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
        <div class="flex sm:flex-row flex-col gap-4">
            <router-link class="sm:w-1/2" :to="{
                name: 'save'
            }"><Button text=" Sauvegarder les données" class="w-full" />
            </router-link>
            <Button text="Ajouter une extraction" class="sm:w-1/2" @click="addExtraction"></Button>
        </div>

        <div class="flex sm:flex-row flex-col">
            <div class="sm:w-1/2 sm:px-8">
                <p class="text-3xl mb-8">
                    De l'Arbre aux WC ! En passant par le café.
                </p>
                <p class="text-2xl text-justify">
                    Cette application, réservée pour le café de spécialité, permet de renseigner vos relevés TDS
                    afin de situer votre extraction sur les normes du SCA (Speciality Coffee Association).
                </p>
            </div>
            <div class="w-full sm:w-1/2">
                <h2 class="text-3xl py-4 sm:py-0 sm:px-8">Extractions</h2>
                <div v-for="extraction in extractions" class="flex flex-row sm:px-8 items-baseline">
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
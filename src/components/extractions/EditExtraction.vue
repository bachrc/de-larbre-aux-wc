<script lang="ts">
import { defineComponent } from "vue"
import InputField from "../common/InputField.vue"
import Button from "../common/Button.vue"
import TdsChart from "../TdsChart.vue"
import SyntheseTds from "./SyntheseTds.vue"
import { MutationType } from "../../mutations"
import { Extraction } from "../../models"

export default defineComponent({
  data() {
    return {
      isEditingName: false
    }
  },
  computed: {
    extractionId(): string {
      return this.$route.params.id as string;
    },
    releves(): number[] {
      return this.$store.getters.getRelevesFromExtraction(this.extractionId)
    },
    extraction(): Extraction {
      return this.$store.getters.getExtractionById(this.extractionId)
    },
  },
  methods: {
    updatePoidsCafe(poids: number) {
      this.$store.commit(MutationType.UPDATE_POIDS_CAFE, { extractionId: this.extractionId, poids })
    },
    updatePoidsBoisson(poids: number) {
      this.$store.commit(MutationType.UPDATE_POIDS_BOISSON, { extractionId: this.extractionId, poids })
    },
    updateExtractionName(name: string) {
      this.$store.commit(MutationType.UPDATE_EXTRACTION_NAME, { extractionId: this.extractionId, name })
    },
    addTds() {
      this.$store.commit(MutationType.ADD_TDS_TO_EXTRACTION, this.extractionId)
    },
    updateTds(value: number, index: number) {
      this.$store.commit(MutationType.UPDATE_TDS, { extractionId: this.extractionId, index, value })
    },
    removeTds(index: number) {
      this.$store.commit(MutationType.REMOVE_TDS, { extractionId: this.extractionId, index })
    },
    toggleEditName() {
      this.isEditingName = !this.isEditingName
    }
  },
  components: {
    InputField,
    Button,
    TdsChart,
    SyntheseTds
  }
})
</script>

<template>
  <div class="flex flex-col">
    <div class="flex md:flex-row flex-col">
      <section class="w-3/5 flex flex-col">
        <div class="flex flex-row justify-between items-center">
          <input v-if="isEditingName" type="text" :value="extraction.name" class="w-full"
            @input="e => updateExtractionName(e.target.value)" @keyup.enter.native="toggleEditName" />
          <h1 v-else class="text-2xl pb-8">{{ extraction.name }}</h1>
          <font-awesome-icon class="h-8" icon="fa-solid fa-pen-to-square" @click="toggleEditName" />
        </div>

        <div class="flex flex-row">
          <InputField type="number" label="Poids de café" placeholder="Poids de café" unit="g"
            :value="extraction.poidsCafe.toString()" class="w-1/2" @input="updatePoidsCafe" />
          <InputField type="number" label="Poids de la boisson" placeholder="Poids de boisson"
            :value="extraction.poidsBoisson.toString()" unit="g" class="w-1/2" @input="updatePoidsBoisson" />
        </div>
        <div v-for="(releve, index) in releves" class="flex flex-row">
          <InputField type="number" :label="'Relevé ' + (index + 1)" placeholder="Relevé de TDS" unit="%"
            :value="releve.toString()" @input="(value: number) => updateTds(value, index)" />
          <Button text="Supprimer.." @click="() => removeTds(index)" />
        </div>
        <div>
          <Button text="Ajouter un relevé" @click="addTds" />
        </div>
      </section>
      <section class="w-2/5">
        <TdsChart :extraction-id="extractionId" />
      </section>
    </div>
    <section>
      <SyntheseTds :extraction-id="extractionId" />
    </section>
  </div>
</template>

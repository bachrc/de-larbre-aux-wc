<script lang="ts">
import { defineComponent } from "vue"
import InputField from "../common/InputField.vue"
import Button from "../common/Button.vue"
import TdsChart from "../TdsChart.vue"
import SyntheseTds from "./SyntheseTds.vue"
import { MutationType } from "../../mutations"
import { Extraction } from "../../models/Extraction"

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
    updateTds(tdsValue: string, index: number) {
      this.$store.commit(MutationType.UPDATE_TDS, { extractionId: this.extractionId, index, value: parseFloat(tdsValue) })
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
      <section class="w-3/5 grid grid-cols-[50px_1fr_1fr] gap-y-4 gap-x-4 auto-rows-min items-end">
        <font-awesome-icon class="h-8" icon="fa-solid fa-pen-to-square" @click="toggleEditName" />
        <input v-if="isEditingName" type="text" :value="extraction.name" class="w-full col-span-2"
          @input="e => updateExtractionName(e.target.value)" @keyup.enter.native="toggleEditName" />
        <h1 v-else class="text-2xl col-span-2">{{ extraction.name }}</h1>

        <InputField type="number" label="Poids de café" placeholder="Poids de café" unit="g"
          :value="extraction.poidsCafe.toString()" class="col-start-2" @input="updatePoidsCafe" />
        <InputField type="number" label="Poids de la boisson" placeholder="Poids de boisson"
          :value="extraction.poidsBoisson.toString()" unit="g" @input="updatePoidsBoisson" />

        <template v-for="(releve, index) in releves">
          <font-awesome-icon class="h-10" icon="fa-solid fa-square-minus" @click="() => removeTds(index)" />
          <InputField type="number" :label="'Relevé ' + (index + 1)" placeholder="Relevé de TDS" unit="%"
            :value="releve.toString()" class="col-span-2" @input="(value: string) => updateTds(value, index)" />
        </template>

        <font-awesome-icon class="h-10" icon="fa-solid fa-square-plus" @click="addTds" />
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

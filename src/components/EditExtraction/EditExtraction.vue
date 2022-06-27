<script lang="ts">
import { defineComponent } from "vue"
import InputField from "../common/InputField.vue"
import Button from "../common/Button.vue"
import { MutationType } from "../../mutations"

export default defineComponent({
    computed: {
      extractionId(): string {
        return this.$route.params.id as string;
      },
      releves(): number[] {
        return this.$store.getters.getRelevesFromExtraction(this.extractionId)
      }
    },
    methods: {
      updatePoidsCafe(poids: string) {
        this.$store.commit(MutationType.UPDATE_POIDS_CAFE, {extractionId: this.extractionId, poids: parseInt(poids)})
      },
      updatePoidsBoisson(poids: string) {
        this.$store.commit(MutationType.UPDATE_POIDS_BOISSON, {extractionId: this.extractionId, poids: parseInt(poids)})
      },
      addTds() {
        this.$store.commit(MutationType.ADD_TDS_TO_EXTRACTION, this.extractionId)
      },
      updateTds(value: string, index: number) {
        this.$store.commit(MutationType.UPDATE_TDS, {extractionId: this.extractionId, index, value: parseFloat(value)})
      },
      removeTds(index: number) {
        this.$store.commit(MutationType.REMOVE_TDS, {extractionId: this.extractionId, index})
      }
    },
    components: {
    InputField,
    Button
}
})
</script>

<template>
<div class="flex md:flex-row flex-col">
  <section class="w-1/2 flex flex-col">
    <div class="flex flex-row">
      <InputField label="Poids de café" placeholder="Poids de café" unit="g" value="" class="w-1/2" @input="updatePoidsCafe"/>
      <InputField label="Poids de la boisson" placeholder="Poids de boisson" value="" unit="g" class="w-1/2" @input="updatePoidsBoisson" />
    </div>
    <div v-for="(releve, index) in releves" class="flex flex-row">
      <InputField :label="'Relevé ' + (index + 1)" placeholder="Relevé de TDS" unit="%" :value="releve.toString()" @input="(value: string) => updateTds(value, index)" />
      <Button text="Supprimer.." @click="() => removeTds(index)" />
    </div>
    <div>
      <Button text="Ajouter un relevé" @click="addTds" />
    </div>
  </section>
  <section class="w-1/2">
    Non
  </section>  
</div>
</template>

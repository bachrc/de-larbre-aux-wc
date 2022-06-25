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
        return this.$store.getters.getExtractionById(this.extractionId).releves
      }
    },
    methods: {
      updatePoidsCafe(numero: number, poids: string) {
        this.$store.commit(MutationType.UPDATE_POIDS_CAFE, {extractionId: this.extractionId, poids: parseInt(poids)})
      },
      updatePoidsBoisson(numero: number, poids: string) {
        this.$store.commit(MutationType.UPDATE_POIDS_BOISSON, {extractionId: this.extractionId, poids: parseInt(poids)})
      },
      addTds() {
        this.$store.commit(MutationType.ADD_TDS_TO_EXTRACTION, this.extractionId)
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
      <InputField label="Poids de café" placeholder="Poids de café" unit="g" class="w-1/2" @update:model-value="updatePoidsCafe"/>
      <InputField label="Poids de la boisson" placeholder="Poids de boisson" unit="g" class="w-1/2" @update:model-value="updatePoidsBoisson" />
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

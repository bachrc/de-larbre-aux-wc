<script lang="ts">
import { defineComponent } from "vue"
import InputField from "./InputField.vue"
import type { Extraction } from "../../models";
import type { PropType } from "vue";

export default defineComponent({
    props: {
        extractionId: String
    },
    data() {
      return {
        updatePoidsCafe(poids: string) {
          console.log("eh oui")
        },
        updatePoidsBoisson(poids: string) {
          console.log("eh ouiiiii")
        } 
      }
    }
})
</script>

<template>
<div class="flex md:flex-row flex-col">
  <section class="w-1/2 flex flex-row">
    <InputField label="Poids de café" placeholder="Poids de café" unit="g" class="w-1/2" @update:model-value="updatePoidsCafe"/>
    <InputField label="Poids de la boisson" placeholder="Poids de boisson" unit="g" class="w-1/2" @update:model-value="updatePoidsBoisson" />
  </section>
  <section class="w-1/2">
    Non
  </section>  
</div>


</template>

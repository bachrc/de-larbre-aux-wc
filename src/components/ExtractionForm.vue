<script lang="ts">
import { defineComponent } from "vue"
import { Extraction } from "../models"
import InputField from "./InputField.vue"

export default defineComponent({
    props: {
        modelValue: Extraction
    },
    components: { InputField },
    methods: {
      updatePoidsCafe(poidsCafe: string) {
        this.$emit('update:modelValue', {...this.modelValue, poidsCafe: poidsCafe})
      },
      updatePoidsBoisson(poidsBoisson: string) {
        this.$emit('update:modelValue', {...this.modelValue, poidsBoisson: poidsBoisson})
      }
    },
    emits: ['update:modelValue']
})
</script>

<template>
    <InputField label="Poids de café" placeholder="Poids de café" unit="g" class="w-1/2" @update:model-value="updatePoidsCafe"/>
    <InputField label="Poids de la boisson" placeholder="Poids de boisson" unit="g" class="w-1/2" v-model="updatePoidsBoisson" />
</template>

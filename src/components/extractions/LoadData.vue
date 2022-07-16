<script lang="ts">
import { defineComponent } from "vue";
import { Button } from "../common/Button.vue"

export default defineComponent({
    components: {
        Button
    },
    methods: {

    }
})
</script>

<template>
    <div class="flex flex-col">
        <h1 class="text-3xl">Charger les données</h1>
        <p>Veuillez rentrer le JSON obtenu dans le menu de sauvegarde. Si vous l'avez altéré, vous êtes bon.ne pour
            réinitialiser le cache, faites attention..</p>
        <textarea />
        <Button />
</template>
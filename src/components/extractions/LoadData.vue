<script lang="ts">
import { defineComponent } from "vue";
import { MutationType } from "../../mutations";
import Button from "../common/Button.vue"

export default defineComponent({
    components: {
        Button
    },
    computed: {
        stateAsText(): string {
            return JSON.stringify(this.$store.state);
        }
    },
    methods: {
        saveInState() {
            this.$store.commit(MutationType.RESTORE_STATE, this.saveContent)
        }
    },
    data() {
        return {
            saveContent: "",
        }
    }
})
</script>

<template>
    <div class="flex flex-col">
        <h1 class="text-5xl mb-8">Données de sauvegarde</h1>
        <p>Voici vos données ! Sauvegardez-les telles quelles, car si vous l'avez altéré, vous êtes bon.ne pour
            réinitialiser le cache, faites attention..</p>
        <textarea>{{ stateAsText }}</textarea>

        <h1 class="text-5xl mb-8">Restaurer un état</h1>
        <p>Dans ce champ, rentrez vos données à restaurer. Pas de ratures hein !</p>
        <textarea @input="saveContent = ($event.target as HTMLInputElement).value">{{ saveContent }}</textarea>
        <Button text="Sauvegarder" @click="saveInState" />
    </div>
</template>
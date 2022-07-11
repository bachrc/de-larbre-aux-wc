<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        text: {
            type: String,
            required: true
        }
    },
    emits: ['click']
})
</script>
<template>
    <a role="button" @click="$emit('click')"
        class="inline-flex items-center justify-center px-5 py-3 mx-5 my-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
        {{ $props.text }}
    </a>
</template>
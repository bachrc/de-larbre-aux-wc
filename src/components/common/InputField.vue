<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        label: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: ""
        },
        unit: String,
        value: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: "text"
        }
    },
    computed: {
        name() {
            return this.label.toLowerCase()
        }
    },
    methods: {
        textUpdate(text: string | number) {
            this.$emit('input', text)
        }
    },
    emits: ['input']
})
</script>

<template>
    <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3">
            <label for="company-website" class="block text-sm font-medium text-gray-700"> {{ label }} </label>
            <div class="mt-1 flex rounded-md shadow-sm">
                <input :type="type" :name="name" :value="value"
                    class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                    :class="{
                        'rounded-r-md': !unit
                    }" :placeholder="placeholder"
                    @input="event => textUpdate((event.target as HTMLInputElement).value)" />
                <span v-if="unit"
                    class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    {{ unit }} </span>
            </div>
        </div>
    </div>

</template>
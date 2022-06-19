<template>
  <main class="flex flex-col">
    <header class="flex mx-auto h-24 items-center">
      <span class="text-3xl">De l'arbre aux WC</span>
    </header>
    <div class="flex md:flex-row flex-col">
      <section class="w-1/2">
        <Extraction />
      </section>
      <section class="w-1/2">
        Non
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import Extraction from "./components/Extraction.vue"
export default {
    components: { Extraction }
}
</script>
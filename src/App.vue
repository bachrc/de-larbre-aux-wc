<template>
  <main class="flex flex-col">
    <header class="flex mx-auto h-24 items-center">
      <span class="text-3xl">
        <router-link to="/">De l'arbre aux WC</router-link>
      </span>
    </header>
    <section class="container mx-auto">
      <router-view></router-view>
    </section>
  </main>
</template>
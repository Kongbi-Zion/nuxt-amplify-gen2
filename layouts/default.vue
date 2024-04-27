<template>
  <div class="h-screen w-full">
    <NavBar />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
</script>

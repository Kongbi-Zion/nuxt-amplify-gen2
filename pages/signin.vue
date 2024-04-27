<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
</script>
<template>
  <div class="h-[calc(100%-4rem)] w-full flex justify-center items-center">
    <div>
      <Authenticator>
        <template v-slot="{ user, signOut }">
          <h1>Hello {{ user.username }}!</h1>
          <button @click="signOut">Sign Out</button>
        </template>
      </Authenticator>
    </div>
  </div>
</template>

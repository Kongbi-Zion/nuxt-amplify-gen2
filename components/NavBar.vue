<template>
  <div class="w-full flex justify-between items-center px-4 h-16 border-b">
    <NuxtLink to="/" class="font-semibold">Home</NuxtLink>
    <button
      class="bg-[#047D95] text-white font-semibold rounded-full px-5 py-2"
      @click="handleSignInSignOut()"
    >
      <p class="text-sm">
        Sign <span v-if="!user">In</span><span v-else>Out</span>
      </p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Hub } from "aws-amplify/utils";
import { signOut } from "aws-amplify/auth";
import { fetchUserAttributes } from "aws-amplify/auth";

// defining states
const user = ref(false);

// check if user is authenticated
try {
  if (process.client) {
    const userAttributes = await fetchUserAttributes();
    if (userAttributes) {
      user.value = true;
    }
  }
} catch (err) {
  // console.log(err)
}

// listen to auth events
Hub.listen("auth", (data) => {
  switch (data.payload.event) {
    case "signedIn":
      user.value = true;
      navigateTo("/");
      break;
    case "signedOut":
      user.value = false;
      navigateTo("/signin");
      break;
  }
});

const handleSignInSignOut = async () => {
  if (user.value) {
    await signOut();
  } else {
    await navigateTo("/signin");
  }
};
</script>

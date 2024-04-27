<template>
  <li class="flex items-center justify-between">
    <div class="font-semibold border w-full rounded px-4 py-2.5">
      {{ todo.content }}
    </div>
    <div class="min-w-[6rem]">
      <button
        type="submit"
        class="inline-flex font-bold items-center py-2.5 px-3 ms-2 text-sm text-white rounded-lg border focus:outline-none bg-[#047D95]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
          />
        </svg>
      </button>
      <button
        type="submit"
        class="inline-flex font-bold items-center py-2.5 px-3 ms-1 text-sm text-white rounded-lg border focus:outline-none bg-red-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"
          />
        </svg>
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});
</script>

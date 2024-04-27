<template>
  <div class="h-[calc(100%-4rem)] w-full flex items-center justify-center">
    <div class="mx-auto w-full max-w-screen-sm">
      <div class="w-full p-5 border shadow-lg rounded-lg min-h-52">
        <p class="text-center font-bold text-xl mb-6 mt-2">Todo List</p>
        <div class="flex items-center max-w-lg mx-auto">
          <div class="w-full">
            <input
              type="text"
              id="add-todo"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-4 p-2.5"
              placeholder="Add todo..."
              required
            />
          </div>
          <button
            type="submit"
            class="inline-flex font-bold items-center py-2.5 px-3 ms-2 text-sm text-white rounded-lg border focus:outline-none bg-[#047D95]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
              />
            </svg>

            Add
          </button>
        </div>

        <div class="w-full border my-4"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

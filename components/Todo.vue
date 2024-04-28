<template>
  <li class="flex items-center justify-between">
    <div class="font-semibold border w-full rounded px-4 py-2.5">
      {{ todoElement.content }}
    </div>
    <div class="min-w-[6rem]">
      <button
        type="submit"
        class="inline-flex font-bold items-center py-2.5 px-3 ms-2 text-sm text-white rounded-lg border focus:outline-none bg-[#047D95]"
        :disabled="editing"
        @click="
          () => {
            editing = true;
            $emit('editTodo', todoElement);
          }
        "
      >
        <svg
          v-if="editing"
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
          />
          <path
            fill="currentColor"
            d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
          >
            <animateTransform
              attributeName="transform"
              dur="0.75s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            />
          </path>
        </svg>
        <svg
          v-else
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
        :disabled="deleting"
        @click="
          () => {
            deleting = true;
            $emit('deletedTodo', todoElement.id);
          }
        "
      >
        <svg
          v-if="deleting"
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
          />
          <path
            fill="currentColor"
            d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
          >
            <animateTransform
              attributeName="transform"
              dur="0.75s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            />
          </path>
        </svg>
        <svg
          v-else
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
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

// generate your data client using the Schema from your backend
const client = generateClient<Schema>();

// defining types
interface TodoAttr {
  id: string;
  content: any;
  createdAt: string;
  updatedAt: string;
  userId: any;
}

// defining props
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});
const { todo } = props;

// defining states
const deleting = ref(false);
const editing = ref(false);
const todoElement = ref<TodoAttr>({
  id: todo.id,
  content: todo.content,
  createdAt: todo.content,
  updatedAt: todo.updatedAt,
  userId: todo.userId,
});

client.models.Todo.onUpdate().subscribe({
  next: (data) => {
    if (todo.id == data.id) {
      todoElement.value = {
        id: data.id,
        content: data.content,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        userId: data.userId,
      };
    }
    editing.value = false;
  },
});

//defining emits
defineEmits(["editTodo", "deletedTodo"]);
</script>

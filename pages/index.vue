<template>
  <div class="h-[calc(100%-4rem)] w-full flex items-center justify-center px-6">
    <div class="mx-auto w-full max-w-screen-sm">
      <div class="w-full p-5 border shadow-lg rounded-lg min-h-40">
        <p class="text-center font-bold text-xl mb-6 mt-2">Todo List</p>

        <p v-if="!user" class="text-center">Opps please signIn!</p>

        <div v-else class="w-full max-w-lg mx-auto">
          <div class="flex items-center">
            <div class="w-full">
              <input
                type="text"
                id="add-todo"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-4 p-2.5"
                placeholder="Add todo..."
                v-model="content"
                required
              />
            </div>
            <button
              type="submit"
              class="inline-flex font-bold items-center py-2.5 px-3 ms-2 text-sm text-white rounded-lg border focus:outline-none bg-[#047D95]"
              :disabled="isAdding"
              @click="addTodo()"
            >
              <svg
                v-if="isAdding"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 mr-1"
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

          <div class="w-full">
            <div class="w-full py-5">
              <div v-if="isLoading" class="w-full flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7 text-[#047D95]"
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
              </div>
              <p v-if="!isLoading && todoList.length == 0" class="text-center">
                It's empty here
              </p>
              <ul v-else class="w-full space-y-5">
                <Todo
                  v-for="todo in todoList"
                  :key="todo.id"
                  :todo="todo"
                  @deletedTodo="deleteTodo"
                  @editTodo="editTodo"
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import Todo from "~/components/Todo.vue";

// generate your data client using the Schema from your backend
const client = generateClient<Schema>();

// defind states
const user = ref<any>(null);
const todoList = ref<any>([]);
const content = ref("");
const isLoading = ref(true);
const isAdding = ref(false);

// function to add todos
const addTodo = async () => {
  if (!user.value || !content.value) return;
  isAdding.value = true;
  const { errors, data: newTodo } = await client.models.Todo.create({
    content: content.value,
    userId: user.value.userId,
  });
  content.value = "";
  if (!errors) {
    todoList.value.push(newTodo);
  }
  isAdding.value = false;
};

// function for deleting todo
const deleteTodo = async (todoId: string) => {
  const { data: deletedTodo, errors } = await client.models.Todo.delete({
    id: todoId,
  });
  if (!errors) {
    const index = todoList.value?.findIndex(
      (el: { id: string }) => el.id === todoId
    );
    if (index != -1) {
      todoList.value?.splice(index, 1);
    }
  }
};

// function to edit todo
const editTodo = async (todo: Schema["Todo"]) => {
  const { data: updatedTodo, errors } = await client.models.Todo.update({
    id: todo.id,
    content: window.prompt("title", todo.content),
  });

  if (!errors) {
    const index = todoList.value?.findIndex(
      (el: { id: string }) => el.id === todo.id
    );
    if (index != -1) {
      todoList.value[index] = updatedTodo;
    }
  }
};

// check if user is authenticated
const { data } = await useFetch("/api/current-user");
if (data && data._rawValue) {
  user.value = data._rawValue;
} else {
  user.value = null;
}

try {
  if (process.client) {
    const userAttributes = await fetchUserAttributes();
    console.log("userAttributes", userAttributes);
    user.value = userAttributes;
  }
} catch (err) {
  // console.log(err)
}

if (process.client) {
  if (user.value) {
    const { data: todos } = await client.models.Todo.list({
      filter: {
        userId: {
          eq: user.value?.userId,
        },
      },
    });
    todoList.value = todos;
    isLoading.value = false;
  } else {
    isLoading.value = false;
  }
}
</script>

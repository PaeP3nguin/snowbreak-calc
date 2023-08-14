<template>
  <q-page class="row items-center justify-evenly">
    <example-component title="Resources component" active :todos="todos" :meta="meta"></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { ref } from 'vue';

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'resources go here'
  },
  {
    id: 2,
    content: 'resources go here'
  },
  {
    id: 3,
    content: 'resources go here'
  },
  {
    id: 4,
    content: 'resources go here'
  },
  {
    id: 5,
    content: 'resources go here'
  }
]);
const meta = ref<Meta>({
  totalCount: 420
});
</script>

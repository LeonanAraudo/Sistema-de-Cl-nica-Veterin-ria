<script setup>
import { Dialog, Button } from 'primevue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: Boolean,   
  item: Object,          
  title: String         
});

const emit = defineEmits(['update:modelValue']);

const close = () => emit('update:modelValue', false);
</script>

<template>
  <Dialog :visible="modelValue" :closable="false" :header="title" modal :style="{ width: '25rem' }">
    <div v-if="item">
      <p v-for="(value, key) in item" :key="key"><strong>{{ key }}:</strong> {{ value }}</p>
    </div>
    <template #footer>
      <Button label="Fechar" @click="close" />
    </template>
  </Dialog>
</template>

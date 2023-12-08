<template>
    <q-card-actions>
        <q-btn @click="emit('set-ftap-levels')" color="primary" label="FTAP levels"> </q-btn>
        <q-space></q-space>
        <q-btn @click="emit('add-level', LEVEL_TYPES.BLIND)" color="primary" label="Add level">
        </q-btn>
        <q-btn @click="emit('add-level', LEVEL_TYPES.BREAK)" color="primary" label="Add break">
        </q-btn>
    </q-card-actions>
</template>

<script setup>
import { LEVEL_TYPES } from 'src/stores/levels'
const emit = defineEmits(['add-level', 'set-ftap-levels'])
</script>

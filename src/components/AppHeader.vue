<template>
    <q-header>
        <q-toolbar>
            <q-btn flat dense icon="menu" aria-label="Menu" @click="toggleLeftDrawer"> </q-btn>
            <q-toolbar-title>
                <div class="text-weight-bold">{{ title }}</div>
            </q-toolbar-title>
            <q-space></q-space>
            <q-btn flat dense icon="menu" aria-label="Menu" @click="toggleRightDrawer"> </q-btn>
        </q-toolbar>
    </q-header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from 'stores/app'

const store = useAppStore()
const { title } = storeToRefs(store)
const { toggleLeftDrawer, toggleRightDrawer } = store
</script>

<template>
    <q-drawer bordered side="left" behavior="desktop" v-model="leftDrawerOpen">
        left drawer content
    </q-drawer>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from 'stores/app'
const { leftDrawerOpen } = storeToRefs(useAppStore())
</script>

<template>
    <q-drawer bordered side="right" behavior="desktop" v-model="rightDrawerOpen">
        right drawer content
    </q-drawer>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from 'stores/app'
const { rightDrawerOpen } = storeToRefs(useAppStore())
</script>

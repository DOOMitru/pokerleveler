<template>
    <q-layout view="hHh lpR fFf">
        <AppHeader></AppHeader>
        <AppLeftDrawer></AppLeftDrawer>
        <AppRightDrawer></AppRightDrawer>
        <q-page-container>
            <router-view></router-view>
        </q-page-container>
    </q-layout>
</template>

<script setup>
import AppHeader from 'components/AppHeader.vue'
import AppLeftDrawer from 'components/AppLeftDrawer.vue'
import AppRightDrawer from 'components/AppRightDrawer.vue'
</script>

<template>
    <q-page class="flex flex-center column q-gutter-sm">
        <component
            @remove-level="removeLevel"
            v-for="(level, index) in levels"
            :is="LevelComponentTypes[level.type]"
            :key="level.id"
            :level="level"
            :index="index">
        </component>
        <LevelActions @add-level="addLevel"></LevelActions>
    </q-page>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useLevelsStore } from 'stores/levels'

import BlindLevel from 'src/components/BlindLevel.vue'
import BreakLevel from 'src/components/BreakLevel.vue'
import LevelActions from 'src/components/LevelActions.vue'

const LevelComponentTypes = {
    blind: BlindLevel,
    break: BreakLevel,
}

const levelsStore = useLevelsStore()
const { addLevel, removeLevel } = levelsStore
const { levels } = storeToRefs(levelsStore)
</script>

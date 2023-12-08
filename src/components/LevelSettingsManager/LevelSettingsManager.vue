<template>
    <q-card flat square bordered>
        <LevelLabels></LevelLabels>
        <div ref="el">
            <component
                @remove-level="removeLevel"
                v-for="level in levels"
                :is="LevelComponentTypes[level.type]"
                :key="level.id"
                :level="level">
            </component>
        </div>
        <q-separator class="q-mt-sm"></q-separator>
        <LevelActions @set-ftap-levels="setFtapLevels" @add-level="addLevel"></LevelActions>
    </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLevelsStore } from 'stores/levels'
import { useSortable } from '@vueuse/integrations/useSortable'

import BlindLevel from './BlindLevel.vue'
import BreakLevel from './BreakLevel.vue'
import LevelLabels from './LevelLabels.vue'
import LevelActions from './LevelActions.vue'

const LevelComponentTypes = {
    blind: BlindLevel,
    break: BreakLevel,
}

const levelsStore = useLevelsStore()
const { levels } = storeToRefs(levelsStore)
const { addLevel, removeLevel, setFtapLevels, onEndSortEvent } = levelsStore

const el = ref(null)
const { option } = useSortable(el, levels, {
    handle: '.break-level-icon',
    onEnd: onEndSortEvent,
})
</script>

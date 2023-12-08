import { ref } from 'vue'
import { uid } from 'quasar'
import { defineStore } from 'pinia'

export const LEVEL_TYPES = {
    BLIND: 'blind',
    BREAK: 'break',
}

export const useLevelsStore = defineStore('levels', () => {
    const MIN_ANTE = ref(0)
    const MIN_BIG_BLIND = ref(2)
    const MIN_SMALL_BLIND = ref(1)
    const MIN_BREAK_DURATION = ref(1)

    const levels = ref([])

    const addLevel = type => {
        const last = levels.value.findLast(l => l.type === type)

        const ante = last ? last.ante : MIN_ANTE.value
        const bigBlind = last ? last.bigBlind * 2 : MIN_BIG_BLIND.value
        const smallBlind = last ? last.smallBlind * 2 : MIN_SMALL_BLIND.value
        const breakDuration = last ? last.breakDuration : MIN_BREAK_DURATION.value

        levels.value.push({
            type: type,
            id: uid(),
            ante,
            bigBlind,
            smallBlind,
            breakDuration,
        })
    }

    const removeLevel = ({ id, type }) => {
        levels.value = levels.value.filter(l => l.id !== id)
    }

    return {
        levels,
        addLevel,
        removeLevel,

        MIN_ANTE,
        MIN_BIG_BLIND,
        MIN_SMALL_BLIND,
        MIN_BREAK_DURATION,
    }
})

import { ref, watch } from 'vue'
import { uid } from 'quasar'
import { defineStore } from 'pinia'

export const LEVEL_TYPES = {
    BLIND: 'blind',
    BREAK: 'break',
}

const FTAP_LEVELS = [
    {
        type: LEVEL_TYPES.BLIND,
        id: uid(),
        level: 1,

        ante: 0,
        bigBlind: 200,
        smallBlind: 100,
        duration: 15 * 60,
    },
    {
        type: LEVEL_TYPES.BLIND,
        id: uid(),
        level: 2,

        ante: 0,
        bigBlind: 400,
        smallBlind: 200,
        duration: 15 * 60,
    },
    {
        type: LEVEL_TYPES.BLIND,
        id: uid(),
        level: 3,

        ante: 0,
        bigBlind: 800,
        smallBlind: 400,
        duration: 15 * 60,
    },
    {
        type: LEVEL_TYPES.BLIND,
        id: uid(),
        level: 4,

        ante: 0,
        bigBlind: 1000,
        smallBlind: 500,
        duration: 15 * 60,
    },
    {
        type: LEVEL_TYPES.BREAK,
        id: uid(),
        level: 0,

        ante: 0,
        bigBlind: 1000,
        smallBlind: 500,
        duration: 10 * 60,
    },
    {
        type: LEVEL_TYPES.BLIND,
        id: uid(),
        level: 5,

        ante: 0,
        bigBlind: 2000,
        smallBlind: 1000,
        duration: 15 * 60,
    },
    {
        type: LEVEL_TYPES.BLIND,
        id: uid(),
        level: 6,

        ante: 0,
        bigBlind: 4000,
        smallBlind: 2000,
        duration: 15 * 60,
    },
    {
        type: LEVEL_TYPES.BLIND,
        id: uid(),
        level: 7,

        ante: 0,
        bigBlind: 8000,
        smallBlind: 4000,
        duration: 15 * 60,
    },
    {
        type: LEVEL_TYPES.BLIND,
        id: uid(),
        level: 8,

        ante: 0,
        bigBlind: 10000,
        smallBlind: 5000,
        duration: 15 * 60,
    },
    {
        type: LEVEL_TYPES.BLIND,
        id: uid(),
        level: 9,

        ante: 0,
        bigBlind: 20000,
        smallBlind: 10000,
        duration: 15 * 60,
    },
]

export const secondsToTime = seconds => {
    const hours = Math.floor(seconds / 3600)
    let secondsLeft = seconds % 3600

    const minutes = Math.floor(secondsLeft / 60)
    secondsLeft = secondsLeft % 60

    const hoursStr = hours < 10 ? '0' + hours : hours
    const minStr = minutes < 10 ? '0' + minutes : minutes
    const secStr = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft

    return `${hoursStr}:${minStr}:${secStr}`
}

export const getDurationInSeconds = str => {
    const parts = str.split(':', 3)

    let hours = 0,
        minutes = 0,
        seconds = 0

    if (parts.length === 3) {
        const [first, second, third] = parts
        hours = parseInt(first, 10)
        minutes = parseInt(second, 10)
        seconds = parseInt(third, 10)
    } else if (parts.length === 2) {
        const [first, second] = parts
        minutes = parseInt(first, 10)
        seconds = parseInt(second, 10)
    } else if (parts.length === 1) {
        const [first] = parts
        minutes = parseInt(first, 10)
    } else return -1

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return -1

    return hours * 3600 + minutes * 60 + seconds
}

export const subDurationTime = (str, seconds = 60) => {
    const current = getDurationInSeconds(str)
    return secondsToTime(current - seconds < 0 ? 0 : current - seconds)
}

export const addDurationTime = (str, seconds = 60) => {
    return secondsToTime(getDurationInSeconds(str) + seconds)
}

export const useLevelsStore = defineStore('levels', () => {
    const MIN_ANTE = ref(0)
    const MIN_BIG_BLIND = ref(2)
    const MIN_SMALL_BLIND = ref(1)
    const MIN_DURATION = ref(60)

    const levels = ref([])

    const addLevel = type => {
        const last = levels.value.findLast(l => l.type === type)

        const level = last ? last.level + 1 : 1
        const ante = last ? last.ante : MIN_ANTE.value
        const bigBlind = last ? last.bigBlind * 2 : MIN_BIG_BLIND.value
        const smallBlind = last ? last.smallBlind * 2 : MIN_SMALL_BLIND.value
        const duration = last ? last.duration : MIN_DURATION.value

        levels.value.push({
            type: type,
            id: uid(),
            level,

            ante,
            bigBlind,
            smallBlind,
            duration,
        })
    }

    const removeLevel = ({ id }) => {
        let blindIndex = 1,
            breakIndex = 1

        levels.value = levels.value.filter(l => l.id !== id)

        levels.value.forEach(l => {
            if (l.type === LEVEL_TYPES.BLIND) {
                l.level = blindIndex++
            } else l.level = breakIndex++
        })
    }

    const setFtapLevels = () => {
        levels.value = JSON.parse(JSON.stringify(FTAP_LEVELS))
    }

    const onEndSortEvent = event => {
        const { newIndex, oldIndex } = event
        const level = levels.value[oldIndex]

        levels.value.splice(oldIndex, 1)
        levels.value.splice(newIndex, 0, level)
    }

    return {
        levels,
        addLevel,
        removeLevel,
        setFtapLevels,
        onEndSortEvent,

        MIN_ANTE,
        MIN_BIG_BLIND,
        MIN_SMALL_BLIND,
        MIN_DURATION,
    }
})

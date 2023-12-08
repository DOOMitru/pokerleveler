<template>
    <q-card-section class="q-pa-none blind-level-container">
        <div class="text-h6 flex flex-center break-level-title blind-level-item">
            <q-icon class="break-level-icon" name="menu"></q-icon>
        </div>
        <div class="text-h6 flex flex-center break-title-item">BREAK</div>
        <q-input
            @blur="update"
            @keyup.enter="update"
            dense
            outlined
            class="blind-level-item"
            :color="isValid ? 'primary' : 'negative'"
            :bg-color="isValid ? 'grey-9' : 'negative'"
            input-class="text-center text-weight-bold"
            v-model="duration">
            <template #prepend v-if="q.screen.gt.sm">
                <q-btn
                    @click="subtractMinutes"
                    @mousedown="continuouslySubMinutes"
                    @mouseup="stopContinuouslySubMinutes"
                    flat
                    dense
                    round
                    size="sm"
                    icon="do_not_disturb_on"></q-btn>
            </template>
            <template #append v-if="q.screen.gt.sm">
                <q-btn
                    @click="addMinutes"
                    @mousedown="continuouslyAddMinutes"
                    @mouseup="stopContinuouslyAddMinutes"
                    flat
                    dense
                    round
                    size="sm"
                    icon="add_circle"></q-btn>
            </template>
        </q-input>
        <q-btn
            @click="emit('remove-level', level)"
            icon="close"
            color="grey-9"
            class="blind-level-remove-button blind-level-item">
        </q-btn>
    </q-card-section>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { secondsToTime, getDurationInSeconds } from 'src/stores/levels'

const q = useQuasar()
const emit = defineEmits(['remove-level'])

const props = defineProps({
    level: {
        type: Object,
        required: true,
    },
})

const duration = ref(secondsToTime(props.level.duration))
const isValid = computed(() => getDurationInSeconds(duration.value) > 0)

const update = () => {
    if (!isValid.value) return
}

const addMinutes = () => {
    const seconds = getDurationInSeconds(duration.value)
    duration.value = secondsToTime(seconds + 60)
}

let addInterval = null
const continuouslyAddMinutes = () => {
    addInterval = setInterval(addMinutes, 200)
}
const stopContinuouslyAddMinutes = () => {
    clearInterval(addInterval)
}

const subtractMinutes = () => {
    const seconds = getDurationInSeconds(duration.value)
    duration.value = secondsToTime(seconds - 60 < 0 ? 0 : seconds - 60)
}

let subtractInterval = null
const continuouslySubMinutes = () => {
    subtractInterval = setInterval(subtractMinutes, 200)
}

const stopContinuouslySubMinutes = () => {
    clearInterval(subtractInterval)
}
</script>

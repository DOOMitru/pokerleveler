<template>
    <q-card-section class="q-pa-none blind-level-container">
        <div class="text-h6 flex flex-center break-level-title blind-level-item">
            <q-icon class="break-level-icon" name="menu"></q-icon>
        </div>
        <div class="text-h6 flex flex-center break-title-item">BREAK</div>
        <q-input
            @blur="updateDuration"
            @keyup.enter="updateDuration"
            dense
            outlined
            class="blind-level-item"
            :color="durationValid ? 'primary' : 'negative'"
            :bg-color="durationValid ? 'grey-9' : 'negative'"
            input-class="text-center text-weight-bold"
            v-model="duration">
            <template #prepend v-if="q.screen.gt.sm">
                <q-btn
                    @click="subtractMinutes"
                    @mousedown="durationSubTimer.start()"
                    @mouseup="durationSubTimer.stop()"
                    flat
                    dense
                    round
                    size="sm"
                    icon="do_not_disturb_on">
                </q-btn>
            </template>
            <template #append v-if="q.screen.gt.sm">
                <q-btn
                    @click="addMinutes"
                    @mousedown="durationAddTimer.start()"
                    @mouseup="durationAddTimer.stop()"
                    flat
                    dense
                    round
                    size="sm"
                    icon="add_circle">
                </q-btn>
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

import {
    addDurationTime,
    subDurationTime,
    secondsToTime,
    getDurationInSeconds,
} from 'src/stores/levels'

import ContinuousButtonTimer from 'src/js/ContinuousButtonTimer'

const q = useQuasar()
const emit = defineEmits(['remove-level'])

const props = defineProps({
    level: {
        type: Object,
        required: true,
    },
})

const duration = ref(secondsToTime(props.level.duration))
const durationValid = computed(() => getDurationInSeconds(duration.value) > 0)

const updateDuration = () => {
    if (!durationValid.value) return
}

const addMinutes = () => (duration.value = addDurationTime(duration.value))
const subtractMinutes = () => (duration.value = subDurationTime(duration.value))

const durationAddTimer = new ContinuousButtonTimer(addMinutes)
const durationSubTimer = new ContinuousButtonTimer(subtractMinutes)
</script>

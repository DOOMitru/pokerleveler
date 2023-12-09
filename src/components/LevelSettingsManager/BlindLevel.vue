<template>
    <q-card-section class="q-pa-none blind-level-container">
        <div class="text-h6 flex flex-center blind-level-title blind-level-item">
            <span v-if="index < 10" class="text-primary">0</span>{{ index }}
        </div>
        <q-input
            @change="updateAnte"
            dense
            outlined
            min="0"
            step="1"
            type="number"
            class="blind-level-item"
            :color="anteValid ? 'primary' : 'negative'"
            :bg-color="anteValid ? 'grey-9' : 'negative'"
            input-class="text-center text-weight-bold"
            v-model.number="ante">
        </q-input>
        <q-input
            @change="updateSmallBlind"
            dense
            outlined
            min="0"
            :max="bigBlind === 0 ? 0 : bigBlind - 1"
            step="1"
            type="number"
            class="blind-level-item"
            :color="smallBlind ? 'primary' : 'negative'"
            :bg-color="smallBlind ? 'grey-9' : 'negative'"
            input-class="text-center text-weight-bold"
            v-model.number="smallBlind">
        </q-input>
        <q-input
            @change="updateBigBlind"
            dense
            outlined
            min="0"
            step="1"
            type="number"
            class="blind-level-item"
            :color="bigBlind ? 'primary' : 'negative'"
            :bg-color="bigBlind ? 'grey-9' : 'negative'"
            input-class="text-center text-weight-bold"
            v-model="bigBlind">
        </q-input>
        <q-input
            @blur="updateDuration"
            @keyup.enter="updateDuration"
            dense
            outlined
            class="blind-level-item"
            :color="durationValid ? 'primary' : 'negative'"
            :bg-color="durationValid ? 'grey-9' : 'negative'"
            input-class="text-center text-weight-bold"
            :model-value="duration">
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

const index = computed(() => props.level.level)

const duration = ref(secondsToTime(props.level.duration))
const durationValid = computed(() => getDurationInSeconds(duration.value) > 0)

const addMinutes = () => (duration.value = addDurationTime(duration.value))
const subtractMinutes = () => (duration.value = subDurationTime(duration.value))

const durationAddTimer = new ContinuousButtonTimer(addMinutes)
const durationSubTimer = new ContinuousButtonTimer(subtractMinutes)

const updateDuration = () => {
    console.log('updateDuration...')
    if (!durationValid.value) return
}

const ante = ref(props.level.ante)
const anteValid = computed(() => {
    if (`${ante.value}`.length === 0) return false
    return ante.value >= 0
})

const updateAnte = () => {
    console.log('updateAnte...')
    if (!anteValid.value) return
}

const bigBlind = ref(props.level.bigBlind)
const bigBlindValid = computed(() => {
    if (`${bigBlind.value}`.length === 0) return false
    return bigBlind.value > 0
})

const updateBigBlind = () => {
    console.log('updateBigBlind...')
    if (!bigBlindValid.value) return
}

const smallBlind = ref(props.level.smallBlind)
const smallBlindValid = computed(() => {
    if (`${smallBlind.value}`.length === 0) return false
    return smallBlind.value > 0 && smallBlind.value < bigBlind.value
})

const updateSmallBlind = () => {
    console.log('updateSmallBlind...')
    if (!smallBlindValid.value) return
}
</script>

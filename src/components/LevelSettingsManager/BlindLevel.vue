<template>
    <q-card-section class="q-pa-none blind-level-container">
        <div class="text-h6 flex flex-center blind-level-title blind-level-item">
            <span v-if="index < 10" class="text-primary">0</span>{{ index }}
        </div>
        <q-input
            dense
            outlined
            color="primary"
            bg-color="grey-9"
            class="blind-level-item"
            input-class="text-center text-weight-bold"
            :model-value="ante">
            <template #prepend v-if="q.screen.gt.sm">
                <q-btn flat dense round size="sm" icon="do_not_disturb_on"></q-btn>
            </template>
            <template #append v-if="q.screen.gt.sm">
                <q-btn flat dense round size="sm" icon="add_circle"></q-btn>
            </template>
        </q-input>
        <q-input
            dense
            outlined
            color="primary"
            bg-color="grey-9"
            class="blind-level-item"
            input-class="text-center text-weight-bold"
            :model-value="smallBlind">
            <template #prepend v-if="q.screen.gt.sm">
                <q-btn flat dense round size="sm" icon="do_not_disturb_on"></q-btn>
            </template>
            <template #append v-if="q.screen.gt.sm">
                <q-btn flat dense round size="sm" icon="add_circle"></q-btn>
            </template>
        </q-input>
        <q-input
            dense
            outlined
            color="primary"
            bg-color="grey-9"
            class="blind-level-item"
            input-class="text-center text-weight-bold"
            :model-value="bigBlind">
            <template #prepend v-if="q.screen.gt.sm">
                <q-btn flat dense round size="sm" icon="do_not_disturb_on"></q-btn>
            </template>
            <template #append v-if="q.screen.gt.sm">
                <q-btn flat dense round size="sm" icon="add_circle"></q-btn>
            </template>
        </q-input>
        <q-input
            dense
            outlined
            color="primary"
            bg-color="grey-9"
            class="blind-level-item"
            input-class="text-center text-weight-bold"
            :model-value="duration">
            <template #prepend v-if="q.screen.gt.sm">
                <q-btn flat dense round size="sm" icon="do_not_disturb_on"></q-btn>
            </template>
            <template #append v-if="q.screen.gt.sm">
                <q-btn flat dense round size="sm" icon="add_circle"></q-btn>
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
import { computed } from 'vue'
import { useQuasar } from 'quasar'
import { secondsToTime } from 'src/stores/levels'

const q = useQuasar()
const emit = defineEmits(['remove-level'])

const props = defineProps({
    level: {
        type: Object,
        required: true,
    },
})

const index = computed(() => props.level.level)
const duration = computed(() => secondsToTime(props.level.duration))
const smallBlind = computed(() => props.level.smallBlind)
const bigBlind = computed(() => props.level.bigBlind)
const ante = computed(() => props.level.ante)
</script>

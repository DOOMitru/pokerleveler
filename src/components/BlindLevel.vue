<template>
    <div class="flex flex-center q-gutter-sm">
        <div class="text-h6 text-center blind-level-title">
            <span v-if="index + 1 < 10" class="text-primary">0</span>{{ index + 1 }}
        </div>
        <q-input
            dense
            square
            outlined
            color="primary"
            bg-color="grey-9"
            input-class="text-center text-weight-bold"
            v-model="smallBlind">
            <template #prepend>
                <q-btn flat dense round size="sm" icon="do_not_disturb_on"></q-btn>
            </template>
            <template #append>
                <q-btn flat dense round size="sm" icon="add_circle"></q-btn>
            </template>
        </q-input>
        <q-input
            dense
            square
            outlined
            color="primary"
            bg-color="grey-9"
            input-class="text-center text-weight-bold"
            v-model="bigBlind">
            <template #prepend>
                <q-btn flat dense round size="sm" icon="do_not_disturb_on"></q-btn>
            </template>
            <template #append>
                <q-btn flat dense round size="sm" icon="add_circle"></q-btn>
            </template>
        </q-input>
        <q-input
            dense
            square
            outlined
            color="primary"
            bg-color="grey-9"
            input-class="text-center text-weight-bold"
            v-model="ante">
            <template #prepend>
                <q-btn flat dense round size="sm" icon="do_not_disturb_on"></q-btn>
            </template>
            <template #append>
                <q-btn flat dense round size="sm" icon="add_circle"></q-btn>
            </template>
        </q-input>
        <q-btn
            @click="emit('remove-level', level)"
            square
            color="grey-9"
            icon="close"
            class="blind-level-remove-button">
        </q-btn>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const emit = defineEmits(['remove-level'])

const props = defineProps({
    level: {
        type: Object,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
})

console.log(props.index)

const smallBlind = ref(props.level.smallBlind)
const bigBlind = ref(props.level.bigBlind)
const ante = ref(props.level.ante)
</script>

<template>
    <div class="flex flex-center q-gutter-md">
        <q-btn
            @click="emit('add-level', 'blind')"
            square
            class="full-width"
            color="primary"
            label="Add level">
        </q-btn>
        <q-btn
            @click="emit('add-level', 'break')"
            square
            class="full-width"
            color="primary"
            label="Add break">
        </q-btn>
    </div>
</template>

<script setup>
const emit = defineEmits(['add-level'])
</script>

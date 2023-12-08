import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
    const $q = useQuasar()

    const title = ref('Poker Leveler')
    const dark = ref(false)

    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value)
    const toggleRightDrawer = () => (rightDrawerOpen.value = !rightDrawerOpen.value)

    const setDark = value => {
        dark.value = value
        $q.dark.set(value)
    }

    setDark(true)

    return {
        title,

        leftDrawerOpen,
        rightDrawerOpen,

        toggleLeftDrawer,
        toggleRightDrawer,

        setDark,
    }
})

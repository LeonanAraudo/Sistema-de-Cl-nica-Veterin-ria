import { computed } from 'vue'

export function useTableFilter(data, searchTerm) {
    return computed(() => {
        const term = searchTerm?.value?.toLowerCase() || ''
        return data.value.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(term)
            )
        )
    })
}
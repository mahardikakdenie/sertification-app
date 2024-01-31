<template>
	<span class="block w-full">
		<span
			class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
			:class="[setColorStatus]">
			{{ props.row.status }}
		</span>
	</span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    props: {
        type: Object,
        default: null,
    }
});

const setColorStatus = computed(() => {
    const status = props?.props?.row?.status ?? 'due';
    let className = 'text-warning-500 bg-warning-500';
    if (status === 'paid') {
        className = 'text-success-500';
    } else if (status === 'cancled') {
        className = 'text-danger-500 bg-danger-500';
    }

    return className;
});
</script>

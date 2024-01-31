<template>
	<modal
		:active-modal="activeModal"
		:title="title"
		sizeClass="max-w-2xl max-h-2xl"
		@close="close"
    >
		<div>
			<div class="modal-content bg-white p-4">
				<p class="mb-4">{{ text }}</p>
			</div>
		</div>
        <template #footer>
            <div class="flex justify-end mt-4 gap-2">
                <vue-button
                    text="Cancel"
                    btn-class="btn btn-danger light btn-sm"
                    @click="$emit('close')" 
                />
                <vue-button
                    text="Confirm"
                    btn-class="btn btn-primary light btn-sm"
                    @click="submit" 
                />
            </div>
        </template>
	</modal>
</template>

<script setup>
import Modal from '@/components/Modal/index.vue';
import VueButton from '@/components/Button';
import { useTableStore } from '@/store/Table';
import { computed } from 'vue';

const store = useTableStore();

const props = defineProps({
	activeModal: {
		type: Boolean,
	},
	title: {
		type: String,
	},
	text: {
		type: String,
	},
});
const emits = defineEmits(['close', 'submit']);

const close = () => {
	emits('close');
};
const data = computed(() => store?.actionResponse?.data);
const type = computed(() => store?.actionResponse?.key);
const submit = () => {
    emits('submit', data?.value, type?.value);

};
</script>

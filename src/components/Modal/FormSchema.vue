
import { Modal } from '@amcharts/amcharts5';
<template>
    <Modal 
        :activeModal="activeModal" 
        :title="title"
        size-class="max-w-full"
    >
        <div>
            <TextInput 
                class="py-2"
                v-for="(form, index) in forms" 
                :key="index" 
                :label="form.label" 
                v-model="form.value"
                :placeholder="form.label"
            />
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
    </Modal>
</template>

<script setup>
import Modal from '@/components/Modal';
import TextInput from '@/components/Textinput';
import VueButton from '@/components/Button';
import { onMounted, ref, watch } from 'vue';
import { useTableStore } from '@/store/Table';

const store = useTableStore();

const props = defineProps({
    activeModal: {
        type: Boolean,
        default: false,
    },
    data: {
        type: Object,
    },
    isEdit: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: '',
    },
});

const headers = [
    {
        label: 'Kode',
        field: 'code',
        value: '',
    },
    {
        label: 'Nama',
        field: 'name',
        value: '',
    },
    {
        label: 'Jenis',
        value: '',
        field: 'type',
    },
    {
        label: 'Jumlah Unit',
        field: 'count',
        value: '',
    },
];

watch(() => props?.activeModal, () => {
    initData();
})

const forms = ref(headers);

const emits = defineEmits(['submit']);

const reset = () => {
    const formKey = forms.value.map(curr => curr?.field);

    formKey.forEach((key, index) => {
        if (key && props?.data?.hasOwnProperty(key)) {
            forms.value[index].value = '';
        }
    });
};

const initData = () => {
    reset();
    if (props?.isEdit) {
        const formKey = forms.value.map(curr => curr?.field);

        formKey.forEach((key, index) => {
            if (key && props?.data?.hasOwnProperty(key)) {
                forms.value[index].value = props.data[key];
            }
        });
    }
};

const submit = () => {
    emits('submit', forms.value);
};

onMounted(() => {
    initData();
})
</script>

import { Modal } from '@amcharts/amcharts5';
<template>
	<Modal :activeModal="activeModal" :title="title" size-class="max-w-full">
		<div v-for="(form, index) in forms" :key="index">
			<vue-select
				v-if="form.field === 'schema_name'" :label="form.label">
				<vSelect
                    placeholder="Pilih Skema"
					:multiple="false"
                    :options="schemas"
                    v-model="form.value"
                >
					<template #option="{ label }">
						<div>
                            {{ label }}
						</div>
					</template>
				</vSelect>
			</vue-select>
			<vue-select
				v-if="form.field === 'gender'" :label="form.label">
				<vSelect
                    placeholder="Pilih Jenis Kelamin"
					:multiple="false"
                    :options="['Laki Laki', 'Perempuan']"
                    v-model="form.value"
                >
					<template #option="{ label }">
						<div>
                            {{ label }}
						</div>
					</template>
				</vSelect>
			</vue-select>
			<TextInput
                v-else-if="!form.field.includes('schema_name') && !form.field.includes('gender')"
				class="py-2"
				:label="form.label"
				v-model="form.value"
				:placeholder="form.label" />
		</div>

		<template #footer>
			<div class="flex justify-end mt-4 gap-2">
				<vue-button
					text="Cancel"
					btn-class="btn btn-danger light btn-sm"
					@click="$emit('close')" />
				<vue-button
					text="Confirm"
					btn-class="btn btn-primary light btn-sm"
					@click="submit" />
			</div>
		</template>
	</Modal>
</template>

<script setup>
import VueSelect from '@/components/Select/VueSelect';
import Modal from '@/components/Modal';
import TextInput from '@/components/Textinput';
import VueButton from '@/components/Button';
import { onMounted, ref, watch } from 'vue';
import { useTableStore } from '@/store/Table';
import vSelect from 'vue-select'
import { getDataSchemas } from '@/api/schema';

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
		label: 'Name',
		field: 'name',
		value: '',
	},
	{
		label: 'Email',
		field: 'email',
		value: '',
	},
	{
		label: 'Skema',
		value: '',
		field: 'schema_name',
	},
    {
        label: 'Gender',
        value: '',
        field: 'gender',
    },
	{
		label: 'Alamat',
		field: 'address',
		value: '',
	},
	{
		label: 'Nomor Telepon',
		field: 'phone_number',
		value: '',
	},
];

watch(
	() => props?.activeModal,
	() => {
		initData();
        getData();
	}
);

const forms = ref(headers);

const emits = defineEmits(['submit']);

const reset = () => {
	const formKey = forms.value.map((curr) => curr?.field);

	formKey.forEach((key, index) => {
		if (key && props?.data?.hasOwnProperty(key)) {
			forms.value[index].value = '';
		}
	});
};

const schemas = ref([]);

const getData = () => {
    const params = {};
    const callback = (res) => {
        if (res?.data?.meta?.status) {
            const data = res?.data?.data.map(curr => ({
                label: curr?.name,
                id: curr?.id,
            }));
            schemas.value = data;
        }
    };
    const err = (e) => {
        console.log(e);
    };

    getDataSchemas(params, callback, err);
};


const initData = () => {
	reset();
	if (props?.isEdit) {
		const formKey = forms.value.map((curr) => curr?.field);

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
    getData();
});
</script>

<template>
    <div>
        <data-table @create="openModalCreate" />

        <modal-form-schema
            :title="titleModal"
            :is-edit="titleModal === 'Edit Skema'"
            :active-modal="isModalFormVisible"
            :data="schema"
            @close="isModalFormVisible = false"
            @submit="submit"
        />
        <confirm-delete-schema 
            :active-modal="isModalConfirmVisible" 
            title="Hapus Skema"
            :text="textConfirm"
            @close="isModalConfirmVisible = false"
            @submit="confirm"
        />
    </div>
</template>

<script setup>
import DataTable from '@/components/DataTable';
import { getDataSchemas, insertSchema, updateSchema, deleteSchema } from '@/api/schema';
import { useTableStore } from '@/store/Table';
import { onMounted, ref, watch } from 'vue';
import ModalFormSchema from '@/components/Modal/FormSchema.vue';
import ConfirmDeleteSchema from '@/components/Modal/Confirm.vue';
import { useToast } from 'vue-toastification';

const store = useTableStore();
const toast = useToast();


const titleModal = ref('Tambah Skema');

const headers = [
    {
        label: 'id',
        field: 'id',
    },
    {
        label: 'Kode',
        field: 'code'
    },
    {
        label: 'Nama',
        field: 'name',
    },
    {
        label: 'Jenis',
        field: 'type',
    },
    {
        label: 'Jumlah Unit',
        field: 'count',
    },
    {
        label: 'Actions',
        field: 'actions',
    }
];

const schema = ref();
const isModalConfirmVisible = ref(false);
const textConfirm = ref();
watch(() => store?.actionResponse, (value) => {
    if (value?.key === 'update') {
        isModalFormVisible.value = true;
        schema.value = value?.data;
        titleModal.value = 'Edit Skema';
    } else if (value?.key === 'delete') {
        isModalConfirmVisible.value = true;
        textConfirm.value = `Apakah Yakin Ingin Menghapus Skema ${value?.data?.name}`
    }
})

const getData = () => {
    const params = {};
    const callback = (res) => {
        if (res?.data?.meta?.status) {
            const data = res?.data?.data;
            store?.setDatas(data);
        }
    };
    const err = (e) => {
        console.log(e);
    };

    getDataSchemas(params, callback, err);
};

const isModalFormVisible = ref(false);
const openModalCreate = () => {
    isModalFormVisible.value = true;
    titleModal.value = 'Tambah Skema';
};

const confirm = (data) => {
    const callback = (res) => {
        console.log(res.data);
        if (res?.data?.meta?.status) {
            toast?.success('Berhasil Menghapus Skema');
            const data = res?.data?.data;
            store?.deleteSchema(data);
            isModalConfirmVisible.value = false
        }
    }

    const err = (e) => {
        console.error(e);
    }

    deleteSchema(data, callback, err);
};

const submit = (data) => {
    const forms = data?.map(curr => curr?.value);
    const params = {
        code: forms[0],
        name: forms[1],
        type: forms[2],
        count: forms[3],
        id: schema?.value?.id ?? null,
    }
    
    if (titleModal.value === 'Tambah Skema') {
        AddSchema(params);
    } else {
        updateSchemaData(params);
    }
};

const AddSchema = (params) => {
    const callback = (res) => {
        if (res?.data?.meta?.status) {
            const data = res?.data?.data;
            store?.insertData(data);
            toast?.success("Berhasil Menambahkan data skema");
            isModalFormVisible.value = false;
        }
    };

    const err = (e) => {
        console.log(e);
    }

    insertSchema(params, callback, err);
};

const updateSchemaData = (params) => {
    const callback = (res) => {
        if (res?.data?.meta?.status) {
            const data = res?.data?.data;
            store?.updateSchema(data);
            toast?.success("Berhasil Mengedit data skema");
            isModalFormVisible.value = false;
        }
    };

    const err = (e) => {
        console.log(e);
    }

    updateSchema(params, callback, err);
};




onMounted(() => {
    getData();
    store.setHeaders(headers);
})
</script>

<template>
    <div>
        <DataTable @create="showModal" />

        <FormUser
            :active-modal="isModalFormVisible"
            :title="titleModal"
            @close="isModalFormVisible = false"
            @submit="submit"
        />
    </div>
</template>

<script setup>
import FormUser from '@/components/Modal/FormUser.vue';
import DataTable from '@/components/DataTable/index.vue';
import { getDataUsers, createUsers } from '@/api/users';
import { onMounted, ref } from 'vue';
import { useTableStore } from '@/store/Table';
import { useToast } from 'vue-toastification';

const store = useTableStore();
const toast = useToast();

const isModalFormVisible = ref(false);
const titleModal = ref('Tambah Pengguna');

const headers = [
    {
        label: 'Nama',
        field: 'name',
    },
    {
        label: 'Email',
        field: 'email',
    },
    {
        label: 'Skema',
        field: 'schema_name'
    },
    {
        label: 'Jenis Kelamin',
        field: 'gender'
    },
    {
        label: 'Alamat',
        field: 'address'
    },
    {
        label: 'Nomor Handphone',
        field: 'phone_number'
    },
    {
        label: 'Aksi',
        field: 'actions'
    },
];

const getData = () => {
    const params = {
        entities: 'schema',
    };
    const callback = (res) => {
        if (res?.data?.meta?.status) {
            const data = res?.data?.data.map(curr => ({
                ...curr,
                schema_name: curr?.schema?.name,
            }));
            store?.setDatas(data);
            
        }
    };
    const err = (e) => {};

    getDataUsers(params, callback, err);
};

const showModal = () => {
    isModalFormVisible.value = true;
    titleModal.value = 'Tambah Pengguna';
};

const submit = (data) => {
    const forms = data?.map(curr => curr?.value);
    const params = {
        name: forms[0],
        email: forms[1],
        schema_id: forms?.[2]?.id,
        schema_name: forms?.[2]?.label,
        gender: forms[3],
        address: forms[4],
        phone_number: forms[5],
        // id: ?.value?.id ?? null,
    }
    
    if(titleModal.value === 'Tambah Pengguna') {
        inserDataUser(params);
    }
};

const inserDataUser = (params) => {
    const callback = (res) => {
        if (res?.data?.meta?.status) {
            const data = res?.data?.data;
            isModalFormVisible.value = false;
            store?.insertData({...data, schema_name: params?.schema_name});
            toast?.success('Berhasil Menambah User')
        }
    }

    const err = (e) => {
        console.log(e);
    }

    createUsers(params, callback, err)
};

onMounted(() => {
    getData();
    store?.setHeaders(headers);
})
</script>

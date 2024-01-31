<template>
    <div>
        <DataTable />
    </div>
</template>

<script setup>
import DataTable from '@/components/DataTable/index.vue';
import { getDataUsers } from '@/api/users';
import { onMounted } from 'vue';
import { useTableStore } from '@/store/Table';

const store = useTableStore();

const headers = [
    {
        label: 'id',
        field: 'id'
    },
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

onMounted(() => {
    getData();
    store?.setHeaders(headers);
})
</script>

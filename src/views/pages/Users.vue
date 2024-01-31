<template>
    <div>
        <DataTable @create="showModal" />

        <FormUser
            :active-modal="isModalFormVisible"
            :is-edit="titleModal !== 'Tambah Pengguna'"
            :title="titleModal"
            :data="user"
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
import FormUser from '@/components/Modal/FormUser.vue';
import DataTable from '@/components/DataTable/index.vue';
import { getDataUsers, createUsers, updateUsers, deleteUser } from '@/api/users';
import { onMounted, ref, watch } from 'vue';
import { useTableStore } from '@/store/Table';
import { useToast } from 'vue-toastification';
import ConfirmDeleteSchema from '@/components/Modal/Confirm.vue';

const store = useTableStore();
const toast = useToast();

const isModalFormVisible = ref(false);
const titleModal = ref('Tambah Pengguna');
const textConfirm = ref('Hapus Pengguna')

const isModalConfirmVisible = ref(false);

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

const user = ref();
watch(() => store?.actionResponse, (value) => {
    if (value?.key === 'update') {
        isModalFormVisible.value = true;
        user.value = value?.data;
        titleModal.value = "Edit Pengguna"
    } else if (value?.key === 'delete') {
        isModalConfirmVisible.value = true;
        user.value = value?.data;
        textConfirm.value = `Apakah Anda yakin ingin menghapus akun ${user?.value?.name}`
    }
});

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
        schema_name: forms?.[2]?.label ?? user?.value?.schema_name,
        gender: forms[3],
        address: forms[4],
        phone_number: forms[5],
        id: user?.value?.id ?? null,
    }
    
    if(titleModal.value === 'Tambah Pengguna') {
        inserDataUser(params);
    } else {
        updateDataUsers(params)
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

const updateDataUsers = (params) => {
    const callback = (res) => {
        if (res?.data?.meta?.status) {
            const data = res?.data?.data;
            isModalFormVisible.value = false;
            store?.updateUsers({...data, schema_name: params?.schema_name ?? user?.value?.schema_name});
            toast?.success('Berhasil Menambah User')
        }
    };

    const err = (e) => {
        console.log(e);
    }

    updateUsers(params, callback, err);
};


const confirm = (data) => {
    const callback = (res) => {
        if (res?.data?.meta?.status) {
            toast?.success('Berhasil Menghapus Pengguna');
            const data = res?.data?.data;
            store?.deleteSchema(data);
            isModalConfirmVisible.value = false
        }
    }

    const err = (e) => {
        console.error(e);
    }

    deleteUser(data, callback, err);
};


onMounted(() => {
    getData();
    store?.setHeaders(headers);
})
</script>

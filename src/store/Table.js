import { defineStore } from "pinia";
import { advancedTable } from '@/constant/basic-tablle-data';

const __wrapper = {
    state: () => ({
        headers: [
            {
                label: 'Id',
                field: 'id',
            },
            {
                label: 'Order',
                field: 'order',
            },
            {
                label: 'Customer',
                field: 'customer',
            },
            {
                label: 'Date',
                field: 'date',
            },
        
            {
                label: 'Quantity',
                field: 'quantity',
            },
        
            {
                label: 'Amount',
                field: 'amount',
            },
        
            {
                label: 'Status',
                field: 'status',
            },
            {
                label: 'Action',
                field: 'action',
            },
        ],
        datas: advancedTable  || [],
        actions: [
			{
				key: 'update',
				icon: 'bi:pencil',
				tooltipText: 'Edit',
				btnClass: 'btn btn-sm text-primary-400',
			},
			{
				key: 'delete',
				icon: 'material-symbols:delete',
				tooltipText: 'Delete',
				btnClass: 'btn btn-sm text-red-400',
			},
		],
        actionResponse: null,
    }),
    getters: {},
    actions: {
        setHeaders(headers) {
            this.headers = headers;
        },
        setDatas(datas) {
            this.datas = datas;
        },
        insertData(schema) {
            this.datas?.push(schema);
        },
        trigerAction(actions) {
            this.actionResponse = actions;
        },
        updateUsers(user) {
            const index = this.datas?.findIndex(curr => curr?.id === curr?.id);
            if (index !== -1) {
                this.datas[index].name = user?.name;
                this.datas[index].email = user?.email;
                this.datas[index].schema_name = user?.schema_name;
                this.datas[index].gender = user?.gender;
                this.datas[index].address = user?.address;
                this.datas[index].phone_number = user?.phone_number;
            }
        },
        updateSchema(data) {
            const index = this.datas.findIndex(curr => curr?.id === data.id);
            if (index !== -1) {
                this.datas[index].code = data?.code;
                this.datas[index].name = data?.name;
                this.datas[index].type = data?.type;
                this.datas[index].count = data?.count;
            }
        },
        deleteSchema(data) {
            const index = this.datas.findIndex(curr => curr?.id === data?.id);

            if (index !== -1) {
                this.datas.splice(index, 1);
            }
        },
    },
}

export const useTableStore = defineStore('tableStore', __wrapper);

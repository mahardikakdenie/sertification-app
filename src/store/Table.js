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
    }),
    getters: {},
    actions: {
        setHeaders(headers) {
            this.headers = headers;
        },
        setDatas(datas) {
            this.datas = datas;
        },
    },
}

export const useTableStore = defineStore('tableStore', __wrapper);

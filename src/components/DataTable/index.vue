<template>
	<div class="mt-2">
		<Card noborder className="border-none">
			<div
				class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center">
				<h5>{{ title }}</h5>
				<div class="flex gap-4">
					<vue-button 
						text="Buat"
						btn-class="btn btn-dark px-4 py-2"
						@click="$emit('create')"
					/>
					<InputGroup
						v-model="searchTerm"
						placeholder="Search"
						type="text"
						prependIcon="heroicons-outline:search"
						merged 
					/>
				</div>
			</div>

			<vue-good-table
				:columns="headers"
				styleClass="vgt-table bordered centered"
				:rows="datas"
				:pagination-options="{
					enabled: false,
					perPage: perpage,
				}"
				:search-options="{
					enabled: true,
					externalQuery: searchTerm,
				}"
				:select-options="{
					enabled: true,
					selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
					selectioninfoClass: 'custom-class',
					selectionText: 'rows selected',
					clearSelectionText: 'clear',
					disableSelectinfo: true, // disable the select info-500 panel on top
					selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
				}">
				<template v-slot:table-row="props">
					<div>
						<FieldActions v-if="props.column.field === 'actions'" :data="props?.row" />
						<span v-else-if="props?.column?.field === 'id'">
							SKM - {{ props?.row?.id }}
						</span>
						<span v-else class="normal-case">
							{{  props.row[props.column.field]  }}
						</span>
					</div>
				</template>
				<template #pagination-bottom="props">
					<div v-if="false" class="py-4 px-3">
						<Pagination
							:total="50"
							:current="current"
							:per-page="perpage"
							:pageRange="pageRange"
							@page-changed="current = $event"
							:pageChanged="props.pageChanged"
							:perPageChanged="props.perPageChanged"
							enableSearch
							enableSelect
							:options="options">
							>
						</Pagination>
					</div>
				</template>
			</vue-good-table>
		</Card>
	</div>
</template>
<script>
import Dropdown from '@/components/Dropdown';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import InputGroup from '@/components/InputGroup';
import Pagination from '@/components/Pagination';
import { MenuItem } from '@headlessui/vue';
import { advancedTable } from '@/constant/basic-tablle-data';
import { useTableStore } from '@/store/Table';
import { computed } from 'vue';
import FieldActions from '@/components/DataTable/column/actions.vue';
import VueButton from '@/components/Button';
const actions = [
	{
		name: 'view',
		icon: 'heroicons-outline:eye',
	},
	{
		name: 'edit',
		icon: 'heroicons:pencil-square',
	},
	{
		name: 'delete',
		icon: 'heroicons-outline:trash',
	},
];
const options = [
	{
		value: '1',
		label: '1',
	},
	{
		value: '3',
		label: '3',
	},
	{
		value: '5',
		label: '5',
	},
];
export default {
	components: {
		Pagination,
		InputGroup,
		Dropdown,
		Icon,
		Card,
		MenuItem,
		FieldActions,
		VueButton,
	},

	props: {
		title: {
			type: String,
			default: () => '',
		},
	},

	data() {
		return {
			advancedTable,
			current: 1,
			perpage: 10,
			pageRange: 5,
			searchTerm: '',
			actions,
			options,
		};
	},

	setup() {
		const store = useTableStore();

		const headers = computed(() => store?.headers);
		const datas = computed(() => store?.datas);

		return {
			headers,
			datas,
		}
	},
};
</script>
<style lang="scss"></style>

<template>
	<div>
		<template v-for="(action, index) in actions">
			<vue-button
				:key="index"
				:icon="action.icon"
				:icon-tooltip="action.tooltipText"
				:btn-class="action.btnClass"
				@click="handleClick(action)"
				v-if="conditionToMeet(action)" 
            />
		</template>
	</div>
</template>

<script setup>
import VueButton from '@/components/Button';
import { useDataTableStore } from '@/store/Table';
import { computed } from 'vue';

const props = defineProps({
	data: {
		type: Object,
		default: null,
	},
});

// Using the data-table store
const store = useDataTableStore();

// Getting the actions from the store as a computed property
const actions = computed(() => store.actions);

/**
 * Handles the button click event and triggers an action based on the provided action key.
 *
 * @param {Object} action - The action associated with the clicked button.
 * @param {string} action.key - The key identifying the action.
 * @param {*} [props.data] - Additional data associated with the action.
 * @returns {void}
 */
const handleClick = (action) => {
	const params = {
		key: action?.key,
		data: props?.data,
	};
	store?.trigerAction(params);
};
/**
 * Determines whether the specified action meets the conditions based on the current data status.
 *
 * @param {Object} action - The action configuration.
 * @param {string} action.key - The key associated with the action.
 * @returns {boolean} - `true` if the action meets the conditions, otherwise `false`.
 */
const conditionToMeet = (action) => {
	/**
	 * The current status of the data.
	 * @type {string}
	 */
	const status = props.data.status ?? 'draft';

	/**
	 * Configuration for different conditions based on the action key.
	 * @type {Array<Object>}
	 */
	const conditionConfig = [
		{ key: 'draft', targetStatus: 'publish' },
		{ key: 'publish', targetStatus: 'draft' },
		// Add more conditions here as needed
	];

	/**
	 * Evaluates whether the action meets the specified conditions.
	 *
	 * @param {Object} config - The condition configuration.
	 * @param {string} config.key - The key associated with the condition.
	 * @param {string} config.targetStatus - The target status for the condition.
	 * @returns {boolean} - `true` if the action meets the condition, otherwise `false`.
	 */
	const evaluateCondition = (config) => {
		// Check if the condition key matches the action key before evaluating
		if (config.key === action.key) {
			return status === config.targetStatus;
		}

		// Return true if the condition key doesn't match the action key
		return true;
	};

	// Check if any condition is met using the some method
	return conditionConfig.every(evaluateCondition);
};
</script>

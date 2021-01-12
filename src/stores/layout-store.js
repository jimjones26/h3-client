import {writable} from 'svelte/store';

const layoutStore = writable({
	loading: false,
	loadingMessage: null,
	error: false,
	errorMessage: null
});

const customLayoutStore = {
	subscribe: layoutStore.subscribe,

	updateLoadingState: (loading, message) => {
		layoutStore.update(currentState => {
			return {...currentState, loading: loading, loadingMessage: message};
		});
	}
};

export default customLayoutStore;

import {writable} from 'svelte/store';

const layoutStore = writable({
	loading: false,
	loadingMessage: null,
	error: false,
	errorMessage: null,
	showNavHeader: false,
	headerText: null
});

const customLayoutStore = {
	subscribe: layoutStore.subscribe,

	updateLoadingState: (loading, message) => {
		layoutStore.update(currentState => {
			return {...currentState, loading: loading, loadingMessage: message};
		});
	},

	setNavHeader: (showNavHeader, headerText) => {
		console.log('SET NAV HEADER');
		// set visibility to true or false
		// add referring url to array
		// set the header text
		layoutStore.update(currentState => {
			return {...currentState, showNavHeader, headerText};
		});
	}
};

export default customLayoutStore;

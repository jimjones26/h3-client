import {writable} from 'svelte/store';

const layoutStore = writable({
	loading: false,
	loadingMessage: null,
	error: false,
	errorMessage: null,
	showNavHeader: false,
	headerText: null,
	referringUrl: [],
	showTerms: true
});

const customLayoutStore = {
	subscribe: layoutStore.subscribe,

	updateLoadingState: (loading, message) => {
		layoutStore.update(currentState => {
			return {...currentState, loading: loading, loadingMessage: message};
		});
	},

	setNavHeader: (showNavHeader, headerText, referringUrl) => {
		layoutStore.update(currentState => {
			return {...currentState, showNavHeader, headerText, referringUrl};
		});
	},

	updateTermsVisibility: bool => {
		layoutStore.update(currentState => {
			return {...currentState, showTerms: bool};
		});
	}
};

export default customLayoutStore;

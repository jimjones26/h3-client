import {writable} from 'svelte/store';
import {goto} from '@sapper/app';

import layoutStore from '../stores/layout-store';
import {post} from '../utils/post';

const authStore = writable({
	loading: false,
	error: false,
	message: null,
	emailSent: false
});

const customAuthStore = {
	subscribe: authStore.subscribe,

	/* Request magic link */
	login: async email => {
		layoutStore.updateLoadingState(
			true,
			'Verifying email address. Sending login link.'
		);
		try {
			const request = await post('http://localhost:5000/api/v1/users/login', {
				email
			});
			if (request.status === 'success') {
				await authStore.update(currentState => {
					return {...currentState, emailSent: true};
				});
				await layoutStore.updateLoadingState(false, null);
				goto('/email-sent');
			} else {
				throw new Error('User Not Found');
			}
		} catch (error) {
			authStore.update(currentState => {
				return {
					...currentState,
					emailSent: false,
					error: true,
					message: error.message
				};
			});
			layoutStore.updateLoadingState(false);
		}
	}
};

export default customAuthStore;

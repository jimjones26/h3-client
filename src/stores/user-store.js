import {writable} from 'svelte/store';
import {goto} from '@sapper/app';

import {gqlQuery} from '../graphql';
import {COMPLETE_USER_PROFILE} from '../graphql/queries/user-queries';

import layoutStore from '../stores/layout-store';

const userStore = writable({});

const customUserStore = {
	subscribe: userStore.subscribe,

	/* Complete Client Profile */
	completeProfile: async (userid, preferences) => {
		layoutStore.updateLoadingState(true, 'Updating your profile.');

		await gqlQuery(COMPLETE_USER_PROFILE, {
			id: userid,
			genderPreference: preferences.genderPreference,
			appointmentPreference: preferences.appointmentPreference
		})
			.then(() => {
				goto('/refresh-session');
			})
			.catch(error => {
				console.log('ERROR: ', error);
			});
	}
};

export default customUserStore;

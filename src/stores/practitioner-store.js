import {writable} from 'svelte/store';
import {goto} from '@sapper/app';

import {gqlQuery} from '../graphql';
import {COMPLETE_PRACTITIONER_SETUP} from '../graphql/queries/practitioner-queries';
import layoutStore from '../stores/layout-store';

const practitionerStore = writable({});

const customPractitionerStore = {
	subscribe: practitionerStore.subscribe,

	/* Update Practice Setup  */
	completePracticeSetup: async practiceInfo => {
		console.log('practice info:', practiceInfo);
		layoutStore.updateLoadingState(true, 'Saving your pactice information.');

		await gqlQuery(COMPLETE_PRACTITIONER_SETUP, {
			userId: practiceInfo.userId,
			sessionFee: practiceInfo.sessionFee,
			sessionTime: practiceInfo.sessionTime,
			mainFocus: practiceInfo.mainFocus,
			affiliation: practiceInfo.affiliation,
			experience: practiceInfo.experience,
			biography: practiceInfo.biography
		})
			.then(() => {
				goto('/refresh-session?path=practitioners');
			})
			.catch(error => {
				console.log('ERROR: ', error);
			});
	}
};

export default customPractitionerStore;

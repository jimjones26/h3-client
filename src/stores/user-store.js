import {writable} from 'svelte/store';
import {goto} from '@sapper/app';

import {gqlQuery} from '../graphql';
import {
	COMPLETE_USER_PROFILE,
	COMPLETE_PRACTITIONER_PROFILE,
	COMPLETE_EXTENDED_PRACTITIONER_PROFILE,
	RETRIEVE_ALL_PRACTITIONERS,
	GET_PRACTITIONER_PROFILE_BY_ID
} from '../graphql/queries/user-queries';

import layoutStore from '../stores/layout-store';

const userStore = writable({
	practitioners: []
});

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
				goto('/refresh-session?path=clients');
			})
			.catch(error => {
				console.log('ERROR: ', error);
			});
	},

	/* Complete Practitioner Extended Profile */
	completePractitionerProfile: async practitioner => {
		layoutStore.updateLoadingState(true, 'Updating your profile.');

		await gqlQuery(COMPLETE_PRACTITIONER_PROFILE, {
			id: practitioner.id,
			firstName: practitioner.firstName,
			lastName: practitioner.lastName,
			phoneNumber: practitioner.phoneNumber
		}).catch(error => {
			console.log('ERROR: ', error);
		});
	},

	/* Complete Practitioner Extended Profile */
	completeExtendedPractitionerProfile: async practitioner => {
		layoutStore.updateLoadingState(true, 'Saving your business information.');

		await gqlQuery(COMPLETE_EXTENDED_PRACTITIONER_PROFILE, {
			id: practitioner.id,
			businessName: practitioner.businessName,
			address: practitioner.address,
			city: practitioner.city,
			state: practitioner.state,
			zip: practitioner.zip
		})
			.then(() => {
				goto('/refresh-session?path=practitioners');
			})
			.catch(error => {
				console.log('ERROR: ', error);
			});
	},

	/* Retrieve List of Practitioners */
	retrieveAllPractitioners: async () => {
		layoutStore.updateLoadingState(
			true,
			'Retreiving list of practitioners from database.'
		);

		await gqlQuery(RETRIEVE_ALL_PRACTITIONERS)
			.then(resAsJson => {
				userStore.update(currentState => {
					return {
						...currentState,
						practitioners: resAsJson.data.h3_practitioners
					};
				});
			})
			.catch(error => {
				console.log('ERROR: ', error);
			});
	},

	/* Get a Single Practitioner by ID */
	getPractitionerProfileById: async id => {
		layoutStore.updateLoadingState(true, 'Retrieving a single practitioner.');

		await gqlQuery(GET_PRACTITIONER_PROFILE_BY_ID, {
			id: id
		})
			.then(resAsJson => {
				userStore.update(currentState => {
					return {
						...currentState,
						selectedPractitioner: resAsJson.data.h3_practitioners
					};
				});
			})
			.catch(error => {
				console.log('ERROR: ', error);
			});
	}
};

export default customUserStore;

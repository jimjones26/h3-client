const endpointUrl = 'http://localhost:8080/v1/graphql';

export function gqlQuery(queryObject, variablesObject = null) {
	return fetch(endpointUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query: queryObject,
			variables: variablesObject
		})
	}).then(res => res.json());
}

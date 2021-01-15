import {Router} from '@beyonk/sapper-rbac';
import scopes from '../utils/scopes';

/* 
SCOPES:
- admin (for the head of an org)
- client
- practitioner
*/

const routes = new Router()
	.restrict('/dashboard.*', [
		scopes.adminScope,
		scopes.clientScope,
		scopes.practitionerScope
	])
	.restrict('/admin.*', [scopes.adminScope])
	.unrestrict('/')
	.unrestrict('/login.*')
	.unrestrict('/check-auth.*')
	.unrestrict('/verify-email')
	.unrestrict('/logout.*')
	.restrict('/.*', [
		scopes.adminScope,
		scopes.clientScope,
		scopes.practitionerScope
	])
	// add this after the guarded sub-urls
	.build();

export default routes;

/* 
LOGIN IS THE ONLY OPEN ROUTE
if a route is restricted, a user must have one of the included scopes to access it
if they do not have that scope, they will be redirected, in this case to the check auth server route
if they have a valid access token, it means they are trying to hit a route they are not authorized for
    - redirect back to referring route
if they dont have access token, but do have a refresh token, they need to get new tokens
    - redirect back to referring route
if they have neither access or refresh token, they need to be redirected to login
    - redirect to login
*/

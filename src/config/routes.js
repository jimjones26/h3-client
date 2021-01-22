import {Router} from '@beyonk/sapper-rbac';
import {adminScope, clientScope, practitionerScope} from '../utils/scopes';

const routes = new Router()
	.restrict('/admin.*', [adminScope])
	.restrict('/clients/.*', [clientScope])
	.restrict('/practitioners/.*', [practitionerScope])
	.unrestrict('/.*')
	.build();

export default routes;

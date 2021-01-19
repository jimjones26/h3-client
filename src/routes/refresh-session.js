import {deleteAccessCookie} from '../utils/create-cookie';

export async function get(req, res) {
	res.setHeader('Set-Cookie', [deleteAccessCookie()]);
	let url = '/dashboard';
	let str = `Redirecting to ${url}`;
	res.writeHead(302, {
		Location: url,
		'Content-Type': 'text/plain',
		'Content-Length': str.length
	});
	res.end(str);
}

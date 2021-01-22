import jwt from 'jsonwebtoken';
import {post} from '../../utils/post';
import {
	createAccessCookie,
	createRefreshCookie
} from '../../utils/create-cookie';

export const get = async (req, res) => {
	// get token from page params
	const token = req.params.token;

	// call /session API endpoint and pass the token
	const tokens = await post('http://localhost:5000/api/v1/users/session', {
		token
	});
	if (tokens.status === 'success') {
		res.setHeader('Set-Cookie', [
			createAccessCookie(tokens.accessToken),
			createRefreshCookie(tokens.refreshToken)
		]);

		let url;
		let user = jwt.decode(tokens.accessToken);

		if (user.scope[0] === 'client') {
			url = '/clients/dashboard';
		} else if (user.scope[0] === 'practitioner') {
			url = '/practitioners/dashboard';
		} else if (user.scope[0] === 'admin') {
			url = '/admin/dashboard';
		}

		let str = `Redirecting to ${url}`;
		res.writeHead(302, {
			Location: url,
			'Content-Type': 'text/plain',
			'Content-Length': str.length
		});
		res.end(str);
	} else {
		let url = '/login';
		let str = `Redirecting to ${url}`;
		res.writeHead(302, {
			Location: url,
			'Content-Type': 'text/plain',
			'Content-Length': str.length
		});
		res.end(str);
	}
};

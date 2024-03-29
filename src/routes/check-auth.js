import {post} from '../utils/post';
import {
	createAccessCookie,
	createRefreshCookie,
	deleteAccessCookie,
	deleteRefreshCookie
} from '../utils/create-cookie';

// eslint-disable-next-line no-unused-vars
export async function get(req, res, next) {
	// get the path that was requested before the redirect
	const requestedPath = await req.query.path;

	// check for refresh cookie
	const refreshToken = await req.cookies['refreshToken'];

	if (refreshToken && refreshToken !== 'undefined') {
		// call the auth api refresh token route

		const tokens = await post(
			'http://localhost:5000/api/v1/users/refresh-tokens',
			{refreshToken}
		);

		if (tokens.refreshToken && tokens.accessToken) {
			// valid tokens, create new cookies and redirect to
			// referring url
			res.setHeader('Set-Cookie', [
				createAccessCookie(tokens.accessToken),
				createRefreshCookie(tokens.refreshToken)
			]);
			let url = requestedPath;
			let str = `Redirecting to ${url}`;
			res.writeHead(302, {
				Location: url,
				'Content-Type': 'text/plain',
				'Content-Length': str.length
			});
			res.end(str);
		} else {
			res.setHeader('Set-Cookie', [
				deleteRefreshCookie(),
				deleteAccessCookie()
			]);
			let url = '/login';
			let str = `Redirecting to ${url}`;
			res.writeHead(302, {
				Location: url,
				'Content-Type': 'text/plain',
				'Content-Length': str.length
			});
			res.end(str);
		}
	} else if (!refreshToken) {
		let url = '/login';
		let str = `Redirecting to ${url}`;
		res.writeHead(302, {
			Location: url,
			'Content-Type': 'text/plain',
			'Content-Length': str.length
		});
		res.end(str);
	}
}

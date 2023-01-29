const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
let userdb = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = '72676376';

const expiresIn = '1h';

function createToken(payload) {
	return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isLoginAuthenticated({ email, password }) {
	userdb = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
	return userdb.users.filter(
		(user) => user.email === email && user.password === password
	);
}

function isRegisterAuthenticated({ email }) {
	userdb = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
	return userdb.users.findIndex((user) => user.email === email) !== -1;
}
function getUserIndex(userId) {
	// console.log('### userId: ', userId);
	userdb = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
	return userdb.users.findIndex((user) => user.id === userId);
}

server.post('/api/auth/register', (req, res) => {
	const { email, password, username } = req.body;
	if (isRegisterAuthenticated({ email })) {
		const status = 401;
		const message = 'Email already exist';
		res.status(status).json({ status, message });
		return;
	}

	fs.readFile('./users.json', (err, data) => {
		if (err) {
			const status = 401;
			const message = err;
			res.status(status).json({ status, message });
			return;
		}
		data = JSON.parse(data.toString());
		const last_item_id = data.users[data.users.length - 1].id;

		data.users.push({
			id: last_item_id + 1,
			email: email,
			password: password,
			username: username,
			favorites: [],
		});
		fs.writeFile('./users.json', JSON.stringify(data), (err, result) => {
			if (err) {
				const status = 401;
				const message = err;
				res.status(status).json({ status, message });
				return;
			}
		});
	});
	// const access_token = createToken({email, password, username});
	res.status(200).json({ status: 'Success' });
});

server.post('/api/auth/login', (req, res) => {
	const { email, password } = req.body;
	const user = isLoginAuthenticated({ email, password }).pop();
	console.log(user);

	if (!user) {
		const status = 401;
		const message = 'Incorrect Email or Password';
		res.status(status).json({ status, message });
		return;
	}
	const access_token = createToken({ email, password });
	res.status(200).json({ access_token, userId: user.id });
});

// Get favorite movies
server.get('/api/like/:id', (req, res) => {
	const userId = req.params['id'];
	// const {movieId, userId} = req.body;
	// console.log('## USER: ', req.params['id']);
	fs.readFile('./users.json', (err, data) => {
		if (err) {
			const status = 401;
			const message = err;
			res.status(status).json({ status, message });
			return;
		}
		data = JSON.parse(data.toString());

		const userIndex = getUserIndex(Number(userId));
		console.log('### userIndex: ', userIndex);
		// const last_item_id = data.users[ data.users.length - 1 ].id;
		if (userIndex !== -1) {
			const favoriteMovies = data.users[userIndex].favorites;
			console.log('### Fav:', favoriteMovies);
			res.status(200).json({ movies: favoriteMovies });
		} else {
			const status = 401;
			const message = 'UserId is not exist';
			res.status(status).json({ status, message });
		}
	});
	// const access_token = createToken({email, password, username});
});

server.post('/api/like', (req, res) => {
	const { movieId, userId } = req.body;

	fs.readFile('./users.json', (err, data) => {
		if (err) {
			const status = 401;
			const message = err;
			res.status(status).json({ status, message });
			return;
		}
		data = JSON.parse(data.toString());

		const userIndex = getUserIndex(userId);
		console.log('### userIndex: ', userIndex);
		// const last_item_id = data.users[ data.users.length - 1 ].id;
		if (userIndex !== -1) {
			const favorites = data.users[userIndex].favorites;
			if (!favorites.includes(movieId)) {
				favorites.push(movieId);
			} else {
				// const status = 401;
				// const message = 'MovieId already in favorites';
				// //res.status(status).json({ status, message });
				return;
			}
			fs.writeFile('./users.json', JSON.stringify(data), (err, result) => {
				if (err) {
					const status = 401;
					const message = err;
					res.status(status).json({ status, message });
					return;
				}
			});
		} else {
			const status = 401;
			const message = 'UserId is not exist';
			res.status(status).json({ status, message });
			return;
		}
	});
	// const access_token = createToken({email, password, username});
	res.status(200).json({ status: 'Success' });
});

server.listen(5000, () => {
	console.log('Running fake api json server');
});

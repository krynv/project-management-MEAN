const User = require(`../models/user`);
const jwt = require('jsonwebtoken');
const config = require('../config/database.config');
const jstoxml = require('jstoxml');

module.exports = (router) => {

	router.post('/register', (req, res) => {
		if (!req.body.email) {
			res.json({ success: false, message: 'You must provide an email' });
		} else {
			if (!req.body.username) {
				res.json({ success: false, message: 'You must provide a username' });
			} else {
				if (!req.body.password) {
					res.json({ success: false, message: 'You must provide a password' });
				} else {
					if (!req.body.fullName) {
						res.json({ success: false, message: 'You must provide a name' });
					} else {
						if (!req.body.jobTitle) {
							res.json({ success: false, message: 'You must provide a job title' });
						}
						else {
							let user = new User({
								email: req.body.email.toLowerCase(),
								username: req.body.username.toLowerCase(),
								fullName: req.body.fullName,
								jobTitle: req.body.jobTitle,
								password: req.body.password,
							});

							user.save((err) => {
								if (err) {
									if (err.code === 11000) {
										res.json({ success: false, message: 'Username or email already exists' });
									} else {
										if (err.errors) {
											if (err.errors.email) {
												res.json({ success: false, message: err.errors.email.message });
											} else {
												if (err.errors.username) {
													res.json({ success: false, message: err.errors.username.message });
												} else {
													if (err.errors.fullName) {
														res.json({ success: false, message: err.errors.fullName.message });
													} else {
														if (err.errors.jobTitle) {
															res.json({ success: false, message: err.errors.jobTitle.message });
														} else {
															if (err.errors.password) {
																res.json({ success: false, message: err.errors.password.message });
															} else {
																res.json({ success: false, message: err });
															}
														}
													}
												}
											}
										} else {
											res.json({ success: false, message: 'Could not save user. Error', err });
										}
									}
								} else {
									res.json({ success: true, message: 'Account registered!' });
								}
							});
						}
					}
				}
			}

		}
	});

	router.get('/checkEmail/:email', (req, res) => {
		if (!req.params.email) {
			res.json({ success: false, message: 'No email provided' });
		} else {
			User.findOne({ email: req.params.email }, (err, user) => {
				if (err) {
					res.json({ success: false, message: err });
				} else {
					if (user) {
						res.json({ success: false, message: 'This email address is already in use' });
					} else {
						res.json({ success: true, message: 'Available' });
					}
				}
			});
		}
	});

	router.get('/checkUsername/:username', (req, res) => {
		if (!req.params.username) {
			res.json({ success: false, message: 'No username provided' });
		} else {
			User.findOne({ username: req.params.username }, (err, user) => {
				if (err) {
					res.json({ success: false, message: err });
				} else {
					if (user) {
						res.json({ success: false, message: 'This username is already in use' });
					} else {
						res.json({ success: true, message: 'Available' });
					}
				}
			});
		}
	});

	router.post('/login/:asXml?', (req, res) => {
		if (!req.body.username) {
			res.json({ success: false, message: 'No username provided' });
		} else {
			if (!req.body.password) {
				res.json({ success: false, message: 'No password provided' });
			} else {
				User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
					if (err) {
						res.json({ success: false, message: err });
					} else {
						if (!user) {
							res.json({ success: false, message: 'No username found' });
						} else {
							const validPassword = user.comparePassword(req.body.password);
							if (!validPassword) {
								res.json({ success: false, message: 'Incorrect password' });
							} else {
								const token = jwt.sign(
									{
										userId: user._id
									},
									config.secret,
									{
										expiresIn: '24h'
									});

									if (req.params.asXml) {
										res.set('Content-Type', 'application/xml');
										res.send(jstoxml.toXML({success: true, message: 'Success', token: token, user: { username: user.username}}));
									} else {
										res.json({ success: true, message: 'Success', token: token, user: { username: user.username } });
									}
								
							}
						}
					}
				});
			}
		}
	});

	router.use((req, res, next) => {
		const token = req.headers['authorization'];

		if (!token) {
			res.json({ success: false, message: 'No token provided' });
		} else {
			jwt.verify(token, config.secret, (err, decoded) => {
				if (err) {
					res.json({ success: false, message: `Token invalid: ${err}` });
				} else {
					req.decoded = decoded;
					next();
				}
			});
		}
	});

	router.get('/profile/:asXml?', (req, res) => {
		User.findOne({ _id: req.decoded.userId }).select('admin username email fullName jobTitle participatingProjects').exec((err, user) => {
			if (err) {
				res.json({ success: false, message: err });
			} else {
				if (!user) {
					res.json({ success: false, message: 'User not found' });
				} else {
					if (req.params.asXml) {
						res.set('Content-Type', 'application/xml');
						res.send(jstoxml.toXML({success: true, user: user}));
					} else {
						res.json({ success: true, user: user });
					}
				}
			}
		});
	});

	router.get('/publicProfile/:username/:asXml?', (req, res) => {
		if (!req.params.username) {
			res.json({ success: false, message: 'No username provided' }); 
		} else {
			User.findOne({ username: req.params.username }).select('username email jobTitle').exec((err, user) => { // user email for contact
				if (err) {
					res.json({ success: false, message: 'Something went wrong' }); 
				} else {
					if (!user) {
						res.json({ success: false, message: 'Username not found' }); 
					} else {
						if (req.params.asXml) {
							res.set('Content-Type', 'application/xml');
							res.send(jstoxml.toXML({success: true, user: user}));
						} else {
							res.json({ success: true, user: user }); 
						}
					}
				}
			});
		}
	});

	return router;
}
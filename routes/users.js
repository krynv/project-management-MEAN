const User = require('../models/user');

module.exports = (router) => {

	router.get('/allUsers', (req, res) => {
		User.find({}, (err, users) => {
			if (err) {
				res.json({ success: false, message: err });
			} else {
				if (!users) {
					res.json({ success: false, message: 'No users found' });
				} else {
					res.json({ success: true, users: users });
				}
			}
		}).sort({ '_id': -1 }); // give me newest first (descending order - earliest created in db)
	});

	router.put('/updateUser', (req, res) => {

		if (!req.body._id) {
			res.json({ success: false, message: 'User id is required' });
		} else {

			User.findOne({ _id: req.body._id }, (err, user) => {

				if (err) {
					res.json({ success: false, message: 'Not a valid user id' });
				} else {

					if (!user) {
						res.json({ success: false, message: 'User id was not found' });
					} else {

						User.findOne({ _id: req.decoded.userId }, (err, adminUser) => {

							if (err) {
								res.json({ success: false, message: err });
							} else {

								if (!adminUser) {
									res.json({ success: false, message: 'Unable to authenticate user' });
								} else {
									if (!adminUser.admin) {
										res.json({ success: false, message: 'You are not authorized to edit this user' }); // Return authentication error if not admin
									} else {

										user.email = req.body.email.toLowerCase();
										user.username = req.body.username.toLowerCase();
										user.fullName = req.body.fullName;
										user.jobTitle = req.body.jobTitle;
										user.password = req.body.password;

										user.save((err) => { // save new user
											if (err) {
												res.json({ success: false, message: err });
											} else {
												res.json({ success: true, message: 'User updated' });
											}
										});
									}
								}
							}
						});
					}
				}
			});
		}
	});

	router.put('/updatePersonalPassword', (req, res) => {
		if (!req.body._id) {
			res.json({ success: false, message: 'User id is required' });
		} else {

			User.findOne({ _id: req.body._id }, (err, user) => {

				if (err) {
					res.json({ success: false, message: 'Not a valid user id' });
				} else {

					if (!user) {
						res.json({ success: false, message: 'User id was not found' });
					} else {

						User.findOne({ _id: req.decoded.userId }, (err, currentUser) => {

							if (err) {
								res.json({ success: false, message: err });
							} else {

								if (!currentUser) {
									res.json({ success: false, message: 'Unable to authenticate user' });
								} else {
									
									if (!user._id == req.body._id) { // check if the person updating the password is in fact the account holder
										res.json({ success: false, message: 'You are not authorized to edit this user password' }); // Return authentication error
									} else {

										currentUser.email = currentUser.email.toLowerCase();
										currentUser.username = currentUser.username.toLowerCase();
										currentUser.fullName = currentUser.fullName;
										currentUser.jobTitle = currentUser.jobTitle;
										currentUser.password = req.body.password;

										currentUser.save((err) => {
											if (err) {
												res.json({ success: false, message: err });
											} else {
												res.json({ success: true, message: 'Password updated' });
											}
										});
									}
								}
							}
						});
					}
				}
			});
		}
	});

	router.get('/singleUser/:id', (req, res) => {

		if (!req.params.id) {
			res.json({ success: false, message: 'No user id provided' });
		} else {

			User.findOne({ _id: req.params.id }, (err, user) => {

				if (err) {
					res.json({ success: false, message: 'Not a valid user id' });
				} else {

					if (!user) {
						res.json({ success: false, message: 'User not found' });
					} else {

						User.findOne({ _id: req.decoded.userId }, (err, adminUser) => {

							if (err) {
								res.json({ success: false, message: err });
							} else {
								if (!adminUser) {
									res.json({ success: false, message: 'Unable to authenticate user' });
								} else {
									if (!adminUser.admin) {
										res.json({ success: false, message: 'You are not authorized to get this users information' }); // Return authentication error
									} else {
										res.json({ success: true, user: user });
									}
								}
							}
						});
					}
				}
			});
		}
	});

	router.get('/singleUserForPasswordChange/:id', (req, res) => {

		if (!req.params.id) {
			res.json({ success: false, message: 'No user id provided' });
		} else {

			User.findOne({ _id: req.params.id }, (err, user) => {

				if (err) {
					res.json({ success: false, message: 'Not a valid user id' });
				} else {

					if (!user) {
						res.json({ success: false, message: 'User not found' });
					} else {

						User.findOne({ _id: req.decoded.userId }, (err, currentUser) => {

							if (err) {
								res.json({ success: false, message: err });
							} else {
								if (!currentUser) {
									res.json({ success: false, message: 'Unable to authenticate user' });
								} else {
									if (!req.params.id==req.decoded.userId) {
										res.json({ success: false, message: 'You are not authorized to get this users information' }); // Return authentication error
									} else {
										res.json({ success: true, user: user });
									}
								}
							}
						});
					}
				}
			});
		}
	});

	router.delete('/deleteUser/:id', (req, res) => {

		if (!req.params.id) {
			res.json({ success: false, message: 'No id provided' });
		} else {

			User.findOne({ _id: req.params.id }, (err, user) => {

				if (err) {
					res.json({ success: false, message: 'Invalid id' });
				} else {

					if (!user) {
						res.json({ success: false, messasge: 'User was not found' });
					} else {

						User.findOne({ _id: req.decoded.userId }, (err, adminUser) => {

							if (err) {
								res.json({ success: false, message: err });
							} else {

								if (!adminUser) {
									res.json({ success: false, message: 'Unable to authenticate user' });
								} else {

									if (!adminUser.admin) {
										res.json({ success: false, message: 'You are not authorized to delete this user' });
									} else {
										user.remove((err) => {
											if (err) {
												res.json({ success: false, message: err });
											} else {
												res.json({ success: true, message: 'User deleted' });
											}
										});
									}
								}
							}
						});
					}
				}
			});
		}
	});

	return router;
}
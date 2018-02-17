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
										res.json({ success: false, message: 'You are not authorized to edit this user' }); // Return authentication error
									} else {
										User.update({ "_id": user._id }, { $set: { "email": req.body.email,  "username": req.body.username, "fullName":  req.body.fullName, "jobTitle": req.body.jobTitle } }, (err) => {
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
										res.json({ success: false, message: 'You are not authorized to edit this user' }); // Return authentication error
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
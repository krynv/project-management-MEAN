const User = require('../models/user');
const Project = require('../models/project');
const jwt = require('jsonwebtoken');
const config = require('../config/database.config');

module.exports = (router) => {

	router.post('/newProject', (req, res) => {

		if (!req.body.title) {
			res.json({ success: false, message: 'Project title is required' });
		} else {

			if (!req.body.body) {
				res.json({ success: false, message: 'Project body is required' });
			} else {

				if (!req.body.createdBy) {
					res.json({ success: false, message: 'Project creator is required' });
				} else {

					const project = new Project({
						title: req.body.title,
						body: req.body.body,
						dueDate: req.body.dueDate,
						createdBy: req.body.createdBy
					});

					project.save((err) => {
						if (err) {
							if (err.errors) {
								if (err.errors.title) {
									res.json({ success: false, message: err.errors.title.message });
								} else {
									if (err.errors.body) {
										res.json({ success: false, message: err.errors.body.message });
									} else {
										res.json({ success: false, message: err });
									}
								}
							} else {
								res.json({ success: false, message: err });
							}
						} else {
							res.json({ success: true, message: 'Project saved' });
						}
					});
				}
			}
		}
	});

	router.get('/allProjects', (req, res) => {
		Project.find({}, (err, projects) => {
			if (err) {
				res.json({ success: false, message: err });
			} else {
				if (!projects) {
					res.json({ success: false, message: 'No projects found' });
				} else {
					res.json({ success: true, projects: projects });
				}
			}
		}).sort({ '_id': -1 }); // give me newest first (descending order - earliest created in db)
	});

	router.get('/singleProject/:id', (req, res) => {

		if (!req.params.id) {
			res.json({ success: false, message: 'No project id provided' });
		} else {

			Project.findOne({ _id: req.params.id }, (err, project) => {

				if (err) {
					res.json({ success: false, message: 'Not a valid project id' });
				} else {

					if (!project) {
						res.json({ success: false, message: 'Project not found' });
					} else {

						User.findOne({ _id: req.decoded.userId }, (err, user) => {

							if (err) {
								res.json({ success: false, message: err });
							} else {

								if (!user) {
									res.json({ success: false, message: 'Unable to authenticate user' });

								} else {

									if (user.username !== project.createdBy && !user.admin) {
										res.json({ success: false, message: 'You are not authorized to edit this project' }); // Return authentication error
									} else {
										res.json({ success: true, project: project });
									}
								}
							}
						});
					}
				}
			});
		}
	});


	router.put('/updateProject', (req, res) => {

		if (!req.body._id) {
			res.json({ success: false, message: 'Project id is required' });
		} else {

			Project.findOne({ _id: req.body._id }, (err, project) => {

				if (err) {
					res.json({ success: false, message: 'Not a valid project id' });
				} else {

					if (!project) {
						res.json({ success: false, message: 'Project id was not found' });
					} else {

						User.findOne({ _id: req.decoded.userId }, (err, user) => {

							if (err) {
								res.json({ success: false, message: err });
							} else {

								if (!user) {
									res.json({ success: false, message: 'Unable to authenticate user' });
								} else {

									if (user.username !== project.createdBy && !user.admin) {
										res.json({ success: false, message: 'You are not authorized to edit this project' });
									} else {
										project.title = req.body.title;
										project.body = req.body.body;
										project.dueDate = req.body.dueDate;

										project.save((err) => {
											if (err) {
												if (err.errors) {
													res.json({ success: false, message: 'Please ensure the form is filled out correctly' });
												} else {
													res.json({ success: false, message: err }); // save the project 
												}
											} else {

												User.update( // also go through the users to update their participating projects 
												{ 
													"participatingProjects" : { 
														$elemMatch : { 
															"_id": project._id 
														} 
													} 
												}, 
												{ 
													$set: { 
														"participatingProjects.$.title": req.body.title,
														"participatingProjects.$.body" : req.body.body,
														"participatingProjects.$.dueDate": req.body.dueDate,
													} 
												}, 
												(err) => {
													if (err) {
														res.json({ success: false, message: err });
													} else {
														res.json({ success: true, message: 'Project updated' });
													}
												});
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

	router.delete('/deleteProject/:id', (req, res) => {

		if (!req.params.id) {
			res.json({ success: false, message: 'No id provided' });
		} else {

			Project.findOne({ _id: req.params.id }, (err, project) => {

				if (err) {
					res.json({ success: false, message: 'Invalid id' });
				} else {

					if (!project) {
						res.json({ success: false, messasge: 'Project was not found' });
					} else {

						User.findOne({ _id: req.decoded.userId }, (err, user) => {

							if (err) {
								res.json({ success: false, message: err });
							} else {

								if (!user) {
									res.json({ success: false, message: 'Unable to authenticate user' });
								} else {

									if (user.username !== project.createdBy && !user.admin) {
										res.json({ success: false, message: 'You are not authorized to delete this project' });
									} else {
										project.remove((err) => {
											if (err) {
												res.json({ success: false, message: err });
											} else {
												// find users that have this project and delete it from their document
												User.update( { "participatingProjects" : { $elemMatch : { "_id": project._id } } }, { $pull : { "participatingProjects" : { "_id": project._id } } },{multi: true}, (err) => {

													if (err) {
														res.json({ success: false, message: err });
													} else {
														res.json({ success: true, message: 'Project deleted' });
													}
												});
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


	router.put('/assignToProject', (req, res) => {

		if (!req.body.id) {
			res.json({ success: false, message: 'Project id is required' });
		} else {

			Project.findOne({ _id: req.body.id }, (err, project) => {

				if (err) {
					res.json({ success: false, message: 'Invalid project id' });
				} else {

					if (!project) {
						res.json({ success: false, message: 'That project was not found' });
					} else {

						User.findOne({ _id: req.decoded.userId }, (err, user) => {

							if (err) {
								res.json({ success: false, message: 'Something went wrong' });
							} else {

								if (!user) {
									res.json({ success: false, message: 'Could not authenticate user' });
								} else {
									if (project.assignees.includes(user.username)) {
										res.json({ success: false, message: 'You are already assigned to this project' });
									} else {

										project.numberOfAssignees++;
										project.assignees.push(user.username); // add this user to the assignees for the profile link

										project.save((err) => {
											if (err) {
												res.json({ success: false, message: 'Something went wrong' });
											} else {
												User.update({ "_id": req.decoded.userId }, { $push: { "participatingProjects": project } }, (err) => {
													if (err) {
														res.json({ success: false, message: err });
													} else {
														res.json({ success: true, message: 'Project assigned' });
													}
												});
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

	router.put('/unassignFromProject', (req, res) => {

		if (!req.body.id) {
			res.json({ success: false, message: 'Project id is required' });
		} else {

			Project.findOne({ _id: req.body.id }, (err, project) => {

				if (err) {
					res.json({ success: false, message: 'Invalid project id' });
				} else {

					if (!project) {
						res.json({ success: false, message: 'That project was not found' });
					} else {

						User.findOne({ _id: req.decoded.userId }, (err, user) => {

							if (err) {
								res.json({ success: false, message: 'Something went wrong' });
							} else {

								if (!user) {
									res.json({ success: false, message: 'Could not authenticate user' });
								} else {

									if (!project.assignees.includes(user.username)) {
										res.json({ success: false, message: 'You have already been unassigned from this project' });
									} else {

										project.numberOfAssignees--;
										const arrayIndex = project.assignees.indexOf(user.username);
										project.assignees.splice(arrayIndex, 1);

										project.save((err) => {
											if (err) {
												res.json({ success: false, message: 'Something went wrong' });
											} else {
												// don't forget to remove it from the user too
												User.update({ "_id": req.decoded.userId }, { $pull: { "participatingProjects": { "_id": project._id } } }, (err) => {
													if (err) {
														res.json({ success: false, message: err });
													} else {
														res.json({ success: true, message: 'Unassigned from project' });
													}
												});
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

	router.post('/comment', (req, res) => {

		if (!req.body.comment) {
			res.json({ success: false, message: 'A comment message is required' });
		} else {

			if (!req.body.id) {
				res.json({ success: false, message: 'No id provided' });
			} else {

				Project.findOne({ _id: req.body.id }, (err, project) => {

					if (err) {
						res.json({ success: false, message: 'Invalid project id' });
					} else {

						if (!project) {
							res.json({ success: false, message: 'Project not found' });
						} else {

							User.findOne({ _id: req.decoded.userId }, (err, user) => {

								if (err) {
									res.json({ success: false, message: 'Something went wrong' });
								} else {

									if (!user) {
										res.json({ success: false, message: 'User not found' });
									} else {

										project.comments.push({
											comment: req.body.comment,
											commenter: user.username
										});

										project.save((err) => {

											if (err) {
												res.json({ success: false, message: 'Something went wrong' });
											} else {
												res.json({ success: true, message: 'Comment saved' });
											}
										});
									}
								}
							});
						}
					}
				});
			}
		}
	});

	router.get('/deleteComment/:projectID/:commentID', (req, res) => {
		if (!req.params.projectID) {
			res.json({ success: false, message: 'No projectID provided' });
		} else {
			if (!req.params.commentID) {
				res.json({ success: false, message: 'No commentID provided' });
			} else {
				Project.findOne({ _id: req.params.projectID }, (err, project) => {

					if (err) {
						res.json({ success: false, message: 'Invalid projectID' });
					} else {

						if (!project) {
							res.json({ success: false, messasge: 'Project was not found' });
						} else {
							if (!project.comments.find(comment => comment.id === req.params.commentID)) {
								res.json({ success: false, message: 'Could not find a comment with this commentID' });
							} else {
								User.findOne({ _id: req.decoded.userId }, (err, user) => {

									if (err) {
										res.json({ success: false, message: err });
									} else {

										if (!user) {
											res.json({ success: false, message: 'Unable to authenticate user' });
										} else {

											// if you're not an admin, the person who created it or the commenter
											if (user.username !== project.createdBy && user.username !== project.comments.find(comment => comment.id === req.params.commentID).commenter && !user.admin) {
												res.json({ success: false, message: 'You are not authorized to delete this comment' }); // then return error
											} else {
												// otherwise update the project with it's comment. We don't care about comments in the user table
												Project.update({ "_id": req.params.projectID }, { $pull: { "comments": { "_id": req.params.commentID } } }, (err) => {
													if (err) {
														res.json({ success: false, message: err });
													} else {
														res.json({ success: true, message: 'Comment deleted' });
													}
												});
											}
										}
									}
								});
							}
						}
					}
				});
			}
		}
	});

	router.get('/setProjectStatus/:projectID/:status', (req, res) => {
		
		if (!req.params.projectID) {
			res.json({ success: false, message: 'Project id is required' });
		} else {

			Project.findOne({ _id: req.params.projectID }, (err, project) => {

				if (err) {
					res.json({ success: false, message: 'Not a valid project id' });
				} else {

					if (!project) {
						res.json({ success: false, message: 'Project id was not found' });
					} else {

						User.findOne({ _id: req.decoded.userId }, (err, user) => {

							if (err) {
								res.json({ success: false, message: err });
							} else {

								if (!user) {
									res.json({ success: false, message: 'Unable to authenticate user' });
								} else {
									// if you're not an admin, or the project was not made by you
									if (user.username !== project.createdBy && !user.admin) {
										res.json({ success: false, message: 'You are not authorized to edit this project' });
									} else {
										Project.update({ "_id": req.params.projectID }, { $set: { "projectStatus": req.params.status } }, (err) => {
											if (err) {
												res.json({ success: false, message: err });
											} else {
												// also update any users that are assigned to this project
												User.update( 
													{ "participatingProjects" : 
													{ 
														$elemMatch : 
														{ 
															"_id": project._id 
														} 
													} }, 
													{ 
														$set : 
														{ 
															"participatingProjects.$.projectStatus" : req.params.status 
														}  
													}, 
													{ 
														multi: true  // do it on every user that meets this criteria
													}, 
												(err) => {
													if (err) {
														res.json({ success: false, message: err });
													} else {
														res.json({ success: true, message: 'Status updated' });
													}
												});
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
};
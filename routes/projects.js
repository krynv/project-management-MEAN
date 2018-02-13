const User = require('../models/user'); 
const Project = require('../models/project'); 
const jwt = require('jsonwebtoken'); 
const config = require('../config/database.config'); 

module.exports = (router) => {

	router.post('/newProject', (req, res) => {
	
		if (!req.body.title) {
			res.json({ success: false, message: 'Project title is required.' }); 
		} else {
			
			if (!req.body.body) {
				res.json({ success: false, message: 'Project body is required.' }); 
			} else {

				if (!req.body.createdBy) {
					res.json({ success: false, message: 'Project creator is required.' }); 
				} else {
					
					const project = new Project({
						title: req.body.title, 
						body: req.body.body, 
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
			  res.json({ success: false, message: 'No projects found.' }); 
			} else {
			  res.json({ success: true, projects: projects }); 
			}
		  }
		}).sort({ '_id': -1 }); // give me newest first (descending order - earliest created in db)
	  });

	return router;
};
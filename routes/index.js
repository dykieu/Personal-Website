const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const User = require('../models/user');
const Content = require('../models/content');
const formidable = require('formidable');

// Home Page - Main Page
router.get('/', (req, res, next) =>
{
  let aboutContent = [];
  let projContent = [];
  let workContent = [];
  let workCounter = -1;
  Content.find({}, (err, document) => {
    for (let i = 0; i < document.length; i++) {
      let fade = (i % 2);

      // Checks for img data
      if (document[i].img.data != null){
        let buffer = Buffer.from(document[i].img.data.buffer).toString('base64');
        let content;
        if (document[i].type == 'about') {
          constent = {
            'content': document[i].content,
            'img': buffer,
            'type': document[i].type,
            'id': document[i].id
          };

          aboutContent.push(content);          
        } else if (document[i].type == 'project') {
          content = {
            'content': document[i].content,
            'img': buffer,
            'type': document[i].type,
            'github': document[i].github,
            'demo': document[i].demo,
            'projTitle': document[i].projTitle,
            'projType': document[i].projType,
            'id': document[i].id,
            'fade': fade,
            'counter': i
          };

          projContent.push(content);
        } else {
          content = {
            'content': document[i].content,
            'img': buffer,
            'type': document[i].type,
            'id': document[i].id,
            'counter': workCounter,
            'employer': document[i].employer,
            'jobTitle': document[i].jobTitle,
            'location': document[i].location,
            'date': document[i].date
          };
          workCounter -= 1;
          workContent.push(content);
        } 
      } else {
        let content;
        if (document[i].type == 'about') {
          content = {
            'content': document[i].content,
            'type': document[i].type,
            'id': document[i].id
          };

          aboutContent.push(content);          
        } else if (document[i].type == 'project') {
          content = {
            'content': document[i].content,
            'type': document[i].type,
            'github': document[i].github,
            'demo': document[i].demo,
            'projTitle': document[i].projTitle,
            'projType': document[i].projType,
            'id': document[i].id,
            'fade': fade,
            'counter': i
          };

          projContent.push(content);
        } else {
          content = {
            'content': document[i].content,
            'type': document[i].type,
            'id': document[i].id,
            'counter': workCounter,
            'employer': document[i].employer,
            'jobTitle': document[i].jobTitle,
            'location': document[i].location,
            'date': document[i].date
          };
          workCounter -= 1;
          workContent.push(content);
        }
      }
    }
    res.render('index', { about: aboutContent, proj: projContent, work: workContent });
  });
});

// CMS Panel - Login
router.get(`Route to CMS HERE`, (req, res, next) =>
{
  res.render(`CMS PAGE HERE`);
});

// Authenticate User login
router.post(`Route to CMS HERE`, (req, res, next) => {
  console.log('Attempt User Login');
  if (req.body.name && req.body.password) {
    User.authenticate(req.body.name, req.body.password, (error, user) => {
      if (error || !user) {
        console.error('Error: unable to authenticate credentials');
        let err = new Error('Wrong name or password, please try again');
        err.status = 401;
        return next(err);
      } else {
        console.log('Login Successful... redirecting');
        req.session.userId = user.id;
        console.log(user);
        user_login = user.id;
        return res.redirect(`CMS PAGE HERE`);
      }
    });
  } else {
    console.error('Not all fields were entered');
    let error = new Error('Not all fields were entered');
    error.status = 401;
    return res.next(err);
  }
});

// CMS Panel - Logout
router.get(`Logout route here`, (req,res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        console.log('Logging User out');
        return res.redirect('/');
      }
    });
  } else {
    let error = new Error('No user session found');
    error.status(401);
    return next(error);
  }
});

// CMS Panel - Sign up
router.get(`Route to CMS SIGNUP HERE`, (req, res, next) =>
{
  return res.render('signup');
});

// Sign up - Creates accounts
router.post(`Route to CMS SINGUP HERE`, (req, res, next) => {
  regKey = `Registration Key Here`;
  // Checks user is authorized to create an account
  if (req.body.key == regKey) {
    console.log('Authorized key');
    console.log(req.body);

    // Checks all forms are filled out
    if (req.body.name && req.body.password) {
      let userData = {
        name: req.body.name,
        password: req.body.password,
        type: `Account Type Here`
      };

      User.create(userData, (error, user) => {
        if (error) {
          if (error.name == 'MongoError' && error.code == 11000){
            console.error('Error: unable to create account');
            let err = new Error('Duplicate names, please use a different name');
            err.status = 401;
            return next(err);
          } else {
            console.error(error);
            return next(error);
          }
        } else {
          console.log('Successfully created account');
          req.session.userId = user._id;
          return res.redirect(`CMS PANEL`);
        }
      });
    } else {
      console.error('Error: no name or password');
      let error = new Error('Invalid name or password was entered, please try again');
      error.status = 401;
      return next(error);
    }
  } else {
    console.error('Error: Invalid Key');
    let error = new Error('Invalid key was entered, please try again');
    error.status = 401;
    return next(error);
  }
});

// CMS Panel - Overview page
router.get(`Route to CMS HERE`, async (req, res, next) => {
  // If user is logged in
  if (req.session.userId) {
    console.log('Authorized User: ');
    console.log(req.session);
    let aboutContent = [];
    let projContent = [];
    let workContent = [];
    let workCounter = -1;

    try {
      let document = await Content.find({});
      if (document != '' || document  != null || document != undefined) {
        for (let i = 0; i < document.length; i++) {
          let fade = (i % 2);
    
          // Checks for img data
          if (document[i].img.data != null){
            let buffer = Buffer.from(document[i].img.data.buffer).toString('base64');
            let content;
            if (document[i].type == 'about') {
              constent = {
                'content': document[i].content,
                'img': buffer,
                'type': document[i].type,
                'id': document[i].id
              };
    
              aboutContent.push(content);          
            } else if (document[i].type == 'project') {
              content = {
                'content': document[i].content,
                'img': buffer,
                'type': document[i].type,
                'github': document[i].github,
                'demo': document[i].demo,
                'projTitle': document[i].projTitle,
                'projType': document[i].projType,
                'id': document[i].id,
                'fade': fade,
                'counter': i
              };
    
              projContent.push(content);
            } else {
              content = {
                'content': document[i].content,
                'img': document[i].img,
                'type': document[i].type,
                'id': document[i].id,
                'counter': workCounter,
                'employer': document[i].employer,
                'jobTitle': document[i].jobTitle,
                'location': document[i].location,
                'date': document[i].date
              };
              workCounter -= 1;
              workContent.push(content);
            } 
          } else {
            let content;
            if (document[i].type == 'about') {
              content = {
                'content': document[i].content,
                'type': document[i].type,
                'id': document[i].id
              };
    
              aboutContent.push(content);          
            } else if (document[i].type == 'project') {
              content = {
                'content': document[i].content,
                'type': document[i].type,
                'github': document[i].github,
                'demo': document[i].demo,
                'projTitle': document[i].projTitle,
                'projType': document[i].projType,
                'id': document[i].id,
                'fade': fade,
                'counter': i
              };
    
              projContent.push(content);
            } else {
              content = {
                'content': document[i].content,
                'type': document[i].type,
                'id': document[i].id,
                'counter': workCounter,
                'employer': document[i].employer,
                'jobTitle': document[i].jobTitle,
                'location': document[i].location,
                'date': document[i].date
              };
              workCounter -= 1;
              workContent.push(content);
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
      return next(err);
    }
    
    res.render('edit', { about: aboutContent, proj: projContent, work: workContent });
  } else {
    console.error('Error: Unauthorized User');
    let error = new Error('Unauthorized access, please log-in to a valid account');
    error.status = 401;
    return next(error);
  }
});

// Img Middleware (Multer Used to store Images as binary in mongodb)
let path = require('path'); 

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'routes/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});
 
var upload = multer({ storage: storage });

// Function that adds entries into the database (Distinguished between entries that have images)
router.post(`Route to CMS ADD HERE`, upload.single('img'), (req, res, next) => {
  //Checks that form has content
  if (req.body.content && req.body.type){
    //If the form has an image
    if (req.file != null) {
      let contentData;
      if (req.body.type == 'project') {
        console.log('Adding project');
        contentData = {
          content: req.body.content,
          type: req.body.type,
          github: req.body.github,
          demo: req.body.demo,
          projType: req.body.projType,
          projTitle: req.body.projTitle,
          imgName: req.file.filename,
          img: { 
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
            contentType: 'image/png'
          }
        };
      } else if (req.body.type == 'work') {
        console.log('Adding work');
        contentData = {
          content: req.body.content,
          type: req.body.type,
          employer: req.body.employer,
          jobTitle: req.body.jobTitle,
          location: req.body.location,
          date: req.body.date,
          imgName: req.file.filename,
          img: { 
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
            contentType: 'image/png'
          }
        };
      } else {
        console.log('Adding About');
        contentData = {
          content: req.body.content,
          type: req.body.type,
          imgName: req.file.filename,
          img: { 
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
            contentType: 'image/png'
          }
        };
      }

      Content.create(contentData, (error, content) => {
        if (error) {
          console.error(error);
          return next(error);
        } else {
          console.log('Successfully added content:');
          console.log(content);
          return res.redirect(`CMS Panel`);
        }
      });
    } else if (req.file == null) {
      let contentData;
      if (req.body.type == 'project') {
        contentData = {
          content: req.body.content,
          type: req.body.type,
          github: req.body.github,
          demo: req.body.demo,
          projType: req.body.projType,
          projTitle: req.body.projTitle
        };
      } else if (req.body.type == 'work') {
        contentData = {
          content: req.body.content,
          type: req.body.type,
          employer: req.body.employer,
          jobTitle: req.body.jobTitle,
          location: req.body.location,
          date: req.body.date
        };
      } else {
        contentData = {
          content: req.body.content,
          type: req.body.type
        };
      }
      Content.create(contentData, (error, content) => {
        if (error) {
          console.error(error);
          return next(error);
        } else {
          console.log('Successfully added content:');
          console.log(content);
          return res.redirect(`CMS Panel`);
        }
      });
    }
  } else {
    console.error('Error: A required data field was left blank');
    let error = new Error('One or more required data fields were left blank, please fill out the required information');
    error.status = 401;
    return next(error);
  }
});

// Function to delete content from the database
router.post(`Route to CMS DELETE HERE`, (req, res, next) => {
  console.log('User request to delete object');
  if (req.body.contentToDel) {
    Content.findByIdAndDelete(req.body.contentToDel).exec((error) => {
      if (error) {
        console.error('Error: Unable to delete message');
        let err = new Error('Unable to delete message, please try again');
        err.status = 401;
        return next(err);
      } else {
        console.log('Message successfully deleted');
        return res.redirect(`CMS PANEL`);
      }
    });
  } else {
    console.error('Error: No message found');
    let err = new Error('Unable to find message, please try again');
    err.status = 401;
    return next(err);
  }
});

// Function to redirect to edit page
router.post(`Route to CMS EDIT HERE`, (req, res, next) => {
  if (req.body.contentToEdit) {
    let content = [];
    let data = {
      id: req.body.contentToEdit,
      body: req.body.editBody,
      type: req.body.editType,
      projType: req.body.editProjType,
      projTitle: req.body.editProjTitle,
      github: req.body.editGithub,
      demo: req.body.editDemo,
      employer: req.body.editEmployer,
      jobTitle: req.body.editJobTitle,
      location: req.body.editLocation,
      date: req.body.editDate
    };
    content.push(data);
    return res.render('editForm', {msg: content});
  } else {
    console.error('Error: Either fields not filled');
    let err = new Error('Unable to track message id to edit');
    err.status = 401;
    return next(err);
  }
});

// Function to submit edits into the database
router.post(`Route to CMS EDIT HERE`, (req, res, next) => {
  console.log(req.body);
  if (req.body.content && req.body.type) {
    console.log('User requesting update');
    Content.findByIdAndUpdate(req.body.id, {
      type: req.body.type,
      content: req.body.content,
      github: req.body.github,
      demo: req.body.demo,
      projTitle: req.body.projTitle,
      projType: req.body.projType,
      employer: req.body.employer,
      jobTitle: req.body.jobTitle,
      location: req.body.location,
      date: req.body.date
    }).exec((error) => {
      if (error) {
        console.error('Error: Unable to update contents');
        let err = new Error('Unable to update content, something went wrong');
        err.status = 401;
        return next(err);
      } else {
        console.log('Successfully updated content');
        return res.redirect(`CMS PANEL`);
      }
    });
  } else {
    console.log('Error: Update form missing 1 or more components');
    let err = new Error('Update form is missing fields');
    err.status = 401;
    return next(err);
  }
});

module.exports = router;

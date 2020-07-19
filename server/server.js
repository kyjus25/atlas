const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const multer = require('multer');
const mime = require('mime-types');


const env = require('./be-env.json');
const secret = env.secret;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static('media'));

var mongoose = require('mongoose');
mongoose.plugin(require('@meanie/mongoose-to-json'));
mongoose.connect('mongodb://' + env.ip + '/atlas', {useNewUrlParser: true, useUnifiedTopology: true });

var upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./media");
    },
    filename: function(req, file, callback) {
      callback(null, req.params.id + '-profile.' + mime.extension(file.mimetype));
    }
  })
}).array("file", 3); //Field name and max count

app.post('/services/auth/login', (req, res) => {
  User.find({ username: req.body.username }, function (err, found) {
    if (err) res.status(500).send({error: 'An unknown error occurred.'});
    if (found.length === 0) return res.status(404).send({error: 'Username not found.'});
    const passwordIsValid = bcrypt.compareSync(req.body.password, found[0].password);
    if (passwordIsValid) {
      const token = jwt.sign({ id: found[0]._id }, secret, {
        expiresIn: 86400
      });
      return res.send({token: token});
    } else {
      return res.status(401).send({error: 'Password incorrect.'})
    }
  });
});





// app.get('/services/user/:id', (req, res) => {
//   jwt.verify(req.headers.authtoken, secret, function(err, decoded) {
//     if (err) return res.status(401).send({ error: 'Failed to authenticate token.'});
//     var current_time = new Date().getTime() / 1000;
//     if (decoded && (current_time < decoded.exp)) {
//       // ACTUALLY DO THE THING
//       User.findOne({ _id: req.params.id }, function (err, found) {
//         if (err) return res.status(404).send({ error: 'Unable to return user.' });
//         found.password = null;
//         return res.send(found);
//       });
//     } else {
//       return res.status(401).send({ error: 'Failed to authenticate token.' });
//     }
//   });
// });

app.get('/services/user/me', (req, res) => {
  jwt.verify(req.headers.authtoken, secret, function(err, decoded) {
    if (err) return res.status(401).send({ error: 'Failed to authenticate token.'});
    var current_time = new Date().getTime() / 1000;
    if (decoded && (current_time < decoded.exp)) {
      // ACTUALLY DO THE THING
      User.findOne({ _id: decoded.id }, function (err, found) {
        if (err) return res.status(404).send({ error: 'Unable to return user.' });
        if (!found) return res.status(404).send({ error: 'Unable to return user.' });
        found.password = null;
        return res.send(found);
      });
    } else {
      return res.status(401).send({ error: 'Failed to authenticate token.' });
    }
  });
});
app.get('/services/user', (req, res) => {
  jwt.verify(req.headers.authtoken, secret, function(err, decoded) {
    if (err) return res.status(401).send({ error: 'Failed to authenticate token.'});
    var current_time = new Date().getTime() / 1000;
    if (decoded && (current_time < decoded.exp)) {
      // ACTUALLY DO THE THING
      User.find(function (err, found) {
        if (err) return res.status(404).send({ error: 'Unable to return users.' });
        if (!found || found.length === 0) return res.status(404).send({ error: 'Unable to return users.' });
        found.map(dto => dto.password = null);
        return res.send(found);
      });
    } else {
      return res.status(401).send({ error: 'Failed to authenticate token.' });
    }
  });
});
app.post('/services/user', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  req.body.createdOn = new Date().getTime() / 1000;
  const user = new User(req.body);
  user.save(function (err, user) {
    if (err) return console.error(err);
    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: 86400
    });
    return res.send({token: token});
  });
});
app.put('/services/user/:id', (req, res) => {
  jwt.verify(req.headers.authtoken, secret, function(err, decoded) {
    if (err) return res.status(401).send({ error: 'Failed to authenticate token.'});
    var current_time = new Date().getTime() / 1000;
    if (decoded && (current_time < decoded.exp)) {
      // ACTUALLY DO THE THING
      User.findOneAndUpdate({ _id: req.params.id }, req.body, {"useFindAndModify": true},function (err, found) {
        if (err) return res.status(404).send({ error: 'Unable to update user.' });
        found.password = null;
        return res.send(found);
      });
    } else {
      return res.status(401).send({ error: 'Failed to authenticate token.' });
    }
  });
});
app.delete('/services/user/:id', (req, res) => {
  jwt.verify(req.headers.authtoken, secret, function(err, decoded) {
    if (err) return res.status(401).send({ error: 'Failed to authenticate token.'});
    var current_time = new Date().getTime() / 1000;
    if (decoded && (current_time < decoded.exp)) {
      // ACTUALLY DO THE THING
      User.deleteMany({ _id: req.params.id }, function (err, found) {
        if (err) return res.status(404).send({ error: 'Unable to delete user.' });
        return res.send(true);
      });
    } else {
      return res.status(401).send({ error: 'Failed to authenticate token.' });
    }
  });
});


app.get('/services/contentType', (req, res) => {
  jwt.verify(req.headers.authtoken, secret, function(err, decoded) {
    if (err) return res.status(401).send({ error: 'Failed to authenticate token.'});
    var current_time = new Date().getTime() / 1000;
    if (decoded && (current_time < decoded.exp)) {
      // ACTUALLY DO THE THING
      ContentType.find(function (err, found) {
        if (err) return res.status(404).send([{ error: 'Unable to return content types.' }]);
        if (!found || found.length === 0) return res.send([]);
        return res.send(found);
      });
    } else {
      return res.status(401).send({ error: 'Failed to authenticate token.' });
    }
  });
});
app.post('/services/contentType', (req, res) => {
  jwt.verify(req.headers.authtoken, secret, function(err, decoded) {
    if (err) return res.status(401).send({ error: 'Failed to authenticate token.'});
    var current_time = new Date().getTime() / 1000;
    if (decoded && (current_time < decoded.exp)) {
      // ACTUALLY DO THE THING
      const contentType = new ContentType(req.body);
      contentType.save(function (err, contentType) {
        if (err) return console.error(err);
        const token = jwt.sign({ id: contentType._id }, secret, {
          expiresIn: 86400
        });
        return res.send({token: token});
      });
    } else {
      return res.status(401).send({ error: 'Failed to authenticate token.' });
    }
  });
});
app.put('/services/contentType/:id', (req, res) => {
  jwt.verify(req.headers.authtoken, secret, function(err, decoded) {
    if (err) return res.status(401).send({ error: 'Failed to authenticate token.'});
    var current_time = new Date().getTime() / 1000;
    if (decoded && (current_time < decoded.exp)) {
      // ACTUALLY DO THE THING
      ContentType.findOneAndUpdate({ _id: req.params.id }, req.body, {"useFindAndModify": true},function (err, found) {
        if (err) return res.status(404).send({ error: 'Unable to update content type.' });
        return res.send(found);
      });
    } else {
      return res.status(401).send({ error: 'Failed to authenticate token.' });
    }
  });
});
app.delete('/services/contentType/:id', (req, res) => {
  jwt.verify(req.headers.authtoken, secret, function(err, decoded) {
    if (err) return res.status(401).send({ error: 'Failed to authenticate token.'});
    var current_time = new Date().getTime() / 1000;
    if (decoded && (current_time < decoded.exp)) {
      // ACTUALLY DO THE THING
      ContentType.deleteMany({ _id: req.params.id }, function (err, found) {
        if (err) return res.status(404).send({ error: 'Unable to delete content type.' });
        return res.send(true);
      });
    } else {
      return res.status(401).send({ error: 'Failed to authenticate token.' });
    }
  });
});

// app.put('/services/user/:id/image', (req, res) => {
//   console.log('received');
//   jwt.verify(req.headers.authtoken, secret, function(err, decoded) {
//     if (err) return res.status(401).send({ error: 'Failed to authenticate token.'});
//     var current_time = new Date().getTime() / 1000;
//     if (decoded && (current_time < decoded.exp)) {
//       // ACTUALLY DO THE THING

//       upload(req, res, function(err, body) {
//         if (err) {
//           console.log(err);
//           return res.status(400).send({ error: 'Could not upload file' });
//         }
//       });

//       User.findOneAndUpdate({ _id: req.params.id }, {media: {profile: req.params.id}}, {"useFindAndModify": true},function (err, found) {
//         if (err) return res.status(404).send({ error: 'Unable to update user.' });
//         found.password = null;
//         return res.send(found);
//       });

//     } else {
//       return res.status(401).send({ error: 'Failed to authenticate token.' });
//     }
//   });
// });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!');
});

var User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  createdOn: String
}));

var ContentType = mongoose.model('ContentType', new mongoose.Schema({
  name: String,
  icon: String,
  fields: Array
}));

var Singleton = mongoose.model('Singleton', new mongoose.Schema({
  name: String,
  icon: String,
  fields: Array
}));





// var user = new User({ name: 'Justin' });
// user.save(function (err, user) {
//   if (err) return console.error(err);
//   console.log(user);
// });
//
// User.find({ firstName: /^Justin/ }, function (err, user) {
//   if (err) return console.error(err);
//   console.log('user');
// });
//
//
// User.find(function (err, users) {
//   if (err) return console.error(err);
//   console.log('all users', users);
// });

function getByDto(dto) {
  dto.find(function (err, found) {
    if (err) return [];
    if (found.length === 0) return [];
    return found;
  });
}

function findById(id, dto) {
  dto.find({ _id: id }, function (err, found) {
    console.log('dto', dto, id, found);
    if (err) return null;
    if (found.length === 0) return null;
    return found;
  });
}

// User.find(function (err, found) {
//   if (err) return [];
//   console.log(found);
// });

// const msg = {
//   to: 'kyjus25@gmail.com',
//   from: 'no-reply@uploto.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

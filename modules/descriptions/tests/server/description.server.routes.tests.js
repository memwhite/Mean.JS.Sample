'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Description = mongoose.model('Description'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, description;

/**
 * Description routes tests
 */
describe('Description CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Description
    user.save(function () {
      description = {
        name: 'Description name'
      };

      done();
    });
  });

  it('should be able to save a Description if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Description
        agent.post('/api/descriptions')
          .send(description)
          .expect(200)
          .end(function (descriptionSaveErr, descriptionSaveRes) {
            // Handle Description save error
            if (descriptionSaveErr) {
              return done(descriptionSaveErr);
            }

            // Get a list of Descriptions
            agent.get('/api/descriptions')
              .end(function (descriptionsGetErr, descriptionsGetRes) {
                // Handle Description save error
                if (descriptionsGetErr) {
                  return done(descriptionsGetErr);
                }

                // Get Descriptions list
                var descriptions = descriptionsGetRes.body;

                // Set assertions
                (descriptions[0].user._id).should.equal(userId);
                (descriptions[0].name).should.match('Description name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Description if not logged in', function (done) {
    agent.post('/api/descriptions')
      .send(description)
      .expect(403)
      .end(function (descriptionSaveErr, descriptionSaveRes) {
        // Call the assertion callback
        done(descriptionSaveErr);
      });
  });

  it('should not be able to save an Description if no name is provided', function (done) {
    // Invalidate name field
    description.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Description
        agent.post('/api/descriptions')
          .send(description)
          .expect(400)
          .end(function (descriptionSaveErr, descriptionSaveRes) {
            // Set message assertion
            (descriptionSaveRes.body.message).should.match('Please fill Description name');

            // Handle Description save error
            done(descriptionSaveErr);
          });
      });
  });

  it('should be able to update an Description if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Description
        agent.post('/api/descriptions')
          .send(description)
          .expect(200)
          .end(function (descriptionSaveErr, descriptionSaveRes) {
            // Handle Description save error
            if (descriptionSaveErr) {
              return done(descriptionSaveErr);
            }

            // Update Description name
            description.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Description
            agent.put('/api/descriptions/' + descriptionSaveRes.body._id)
              .send(description)
              .expect(200)
              .end(function (descriptionUpdateErr, descriptionUpdateRes) {
                // Handle Description update error
                if (descriptionUpdateErr) {
                  return done(descriptionUpdateErr);
                }

                // Set assertions
                (descriptionUpdateRes.body._id).should.equal(descriptionSaveRes.body._id);
                (descriptionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Descriptions if not signed in', function (done) {
    // Create new Description model instance
    var descriptionObj = new Description(description);

    // Save the description
    descriptionObj.save(function () {
      // Request Descriptions
      request(app).get('/api/descriptions')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Description if not signed in', function (done) {
    // Create new Description model instance
    var descriptionObj = new Description(description);

    // Save the Description
    descriptionObj.save(function () {
      request(app).get('/api/descriptions/' + descriptionObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', description.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Description with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/descriptions/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Description is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Description which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Description
    request(app).get('/api/descriptions/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Description with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Description if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Description
        agent.post('/api/descriptions')
          .send(description)
          .expect(200)
          .end(function (descriptionSaveErr, descriptionSaveRes) {
            // Handle Description save error
            if (descriptionSaveErr) {
              return done(descriptionSaveErr);
            }

            // Delete an existing Description
            agent.delete('/api/descriptions/' + descriptionSaveRes.body._id)
              .send(description)
              .expect(200)
              .end(function (descriptionDeleteErr, descriptionDeleteRes) {
                // Handle description error error
                if (descriptionDeleteErr) {
                  return done(descriptionDeleteErr);
                }

                // Set assertions
                (descriptionDeleteRes.body._id).should.equal(descriptionSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Description if not signed in', function (done) {
    // Set Description user
    description.user = user;

    // Create new Description model instance
    var descriptionObj = new Description(description);

    // Save the Description
    descriptionObj.save(function () {
      // Try deleting Description
      request(app).delete('/api/descriptions/' + descriptionObj._id)
        .expect(403)
        .end(function (descriptionDeleteErr, descriptionDeleteRes) {
          // Set message assertion
          (descriptionDeleteRes.body.message).should.match('User is not authorized');

          // Handle Description error error
          done(descriptionDeleteErr);
        });

    });
  });

  it('should be able to get a single Description that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Description
          agent.post('/api/descriptions')
            .send(description)
            .expect(200)
            .end(function (descriptionSaveErr, descriptionSaveRes) {
              // Handle Description save error
              if (descriptionSaveErr) {
                return done(descriptionSaveErr);
              }

              // Set assertions on new Description
              (descriptionSaveRes.body.name).should.equal(description.name);
              should.exist(descriptionSaveRes.body.user);
              should.equal(descriptionSaveRes.body.user._id, orphanId);

              // force the Description to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Description
                    agent.get('/api/descriptions/' + descriptionSaveRes.body._id)
                      .expect(200)
                      .end(function (descriptionInfoErr, descriptionInfoRes) {
                        // Handle Description error
                        if (descriptionInfoErr) {
                          return done(descriptionInfoErr);
                        }

                        // Set assertions
                        (descriptionInfoRes.body._id).should.equal(descriptionSaveRes.body._id);
                        (descriptionInfoRes.body.name).should.equal(description.name);
                        should.equal(descriptionInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Description.remove().exec(done);
    });
  });
});

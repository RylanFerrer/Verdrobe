const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const ClosetItem = require('./clothing')
const Post = require('./post')
const UserSchema = new mongoose.Schema({
    email: {
        type:String,
        default:''
    },
    password: {
        type:String,
        default:''
    },
    name: {
      type: String,
      default: ''
    },
    profilePicture: String,
    followers: [String],
    following: [String],
    posts: [Object]
})
UserSchema.pre('save', function(next) {
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
      // Saving reference to this because of changing scopes
      const document = this;
      bcrypt.hash(document.password, saltRounds,
        function(err, hashedPassword) {
        if (err) {
          next(err);
        }
        else {
          document.password = hashedPassword;
          next();
        }
      });
    } else {
      next();
    }
  });
  UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  }
module.exports = mongoose.model("User",UserSchema)
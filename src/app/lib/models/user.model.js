import mongoose, { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
 fullname:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true,
        unique:true
    },
      password:{
        type:String,
        required:true
    },
     phonenumber:{
        type:Number,
        required:true
    },
     role:{
        type:String,
        required:true,
        enum:['student','recruiter'],
        required:true
    },
     profile:{
       bio:{type:String},
       skills:[{type:String}],
       resume:{type:String},//url to resume file
      resumeoriginalname :{type:String},
      company:{type:mongoose.Schema.Types.ObjectId,ref:'company'},
      profilephoto:{
        type:String,
        default:" "
      }
     },
       refreshTokens: [String]
},{timestamps:true});


const User = models.User || model('User', userSchema);
export default User;

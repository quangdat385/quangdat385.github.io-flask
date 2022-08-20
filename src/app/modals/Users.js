const mongoose=require('mongoose');
const slug=require('mongoose-slug-generator');
const mongooseDelete=require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);



mongoose.plugin(slug)

const Schema=mongoose.Schema;

const Users=new Schema({
    _id:{type:Number},
    full_name:{type:String,default:"" },
    first_name:{type:String,default:"" },
    last_name:{type:String,default:"" },
    avatar: { type: String,default:""  },
    nickname:{type:String ,unique:true},
    forChangeImg: { type: String,default:"" },
    bio:{type:String,maxLength:255,default:""},
    tick:{type:Boolean,default:false},
    followings_count:{type:Number,default:0},
    followers_count:{type:Number,default:0},
    likes_count:{type:Number,default:0},
    website_url:{type:String,default:""},
    facebook_url:{type:String,default:""},
    youtube_url:{type:String},default:"",
    twitter_url:{type:String},default:"",
    instargram_url:{type:String,default:""},

},{
    _id:false,
    timestamps:true
})
Users.plugin(AutoIncrement);
Users.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,

});
module.exports =mongoose.model("Users",Users);

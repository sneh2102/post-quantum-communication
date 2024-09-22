const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    profilePicture: {
        type: String,
        default: "",
    },
    birthday: {
        type: Date,
        default: null,
    },
    bio: {
        type: String,
        default: "",
    },
    friends: {
        type: Array,
        default: [],
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;

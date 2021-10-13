const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Username must be unique']
    },
    password: String,
    isBlocked: {
        type: Boolean,
        default: false
    }
})

adminSchema.pre('save', function(next) {
    let user = this

    if(!user.isModified('password')) return next()

    bcrypt.genSalt(6, (err, salt) => {
        if(err) return next(err)
        
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
})

adminSchema.pre('findOneAndUpdate', async function (next) {
    try {
        if (this._update.password) {
            const hashed = await bcrypt.hash(this._update.password, 6)
            this._update.password = hashed;
        }
        next();
    } catch (err) {
        return next(err);
    }
});

adminSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
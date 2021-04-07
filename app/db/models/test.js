const mongoose = require('mongoose')
const Schema = mongoose.Schema

let test = new Schema({
    code: { type: String, required: true, trim: true },
    msgs: {type: Array},
    buyer: Schema.Types.ObjectId,
    seller: Schema.Types.ObjectId,
}, {
   timestamps: true /* creates corresponding timestamp fields: createdAt, updatedAt */
})

module.exports = mongoose.model('test', test)
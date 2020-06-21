const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const favoritesSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    movieTitle : {
        type : String,
    },
    movieId : {
        type : String,
        required : true
    },
    movieImage : {
        type : String
    }
})


const Favorites = mongoose.model("Favorites", favoritesSchema)

module.exports = {
    Favorites
}
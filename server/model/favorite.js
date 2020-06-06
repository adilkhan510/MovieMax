const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const favoritesSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    movieTitle : {
        type : String,

    },
    movieId : {
        type : String
    },
    movieImage : {
        type : String
    }
})


const Favorites = mongoose.model("Favorites", favoritesSchema)

module.exports = {
    Favorites
}
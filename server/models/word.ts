const { Schema, model } = require("mongoose");

const word = new Schema({
    name: {
        type: String,
        required: [true, "Это поле обязательно для заполнения"],
    },
    translate: {
        type: String,
        required: [true, "Это поле обязательно для заполнения"]
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Word = model("Word", word);

export default Word;
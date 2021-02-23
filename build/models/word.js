"use strict";
exports.__esModule = true;
var _a = require("mongoose"), Schema = _a.Schema, model = _a.model;
var word = new Schema({
    name: {
        type: String,
        required: [true, "Это поле обязательно для заполнения"]
    },
    translate: {
        type: String,
        required: [true, "Это поле обязательно для заполнения"]
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        "default": Date.now
    }
});
var Word = model("Word", word);
exports["default"] = Word;

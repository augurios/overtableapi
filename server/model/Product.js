var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


var ProductSchema = new mongoose.Schema({
    Name: { type: String },
    type: { type: String },
    Price: { type: Number },
    Costs: { type: Number },
    Category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    ParentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    CategoryClientId: String,
    ParentCategoryClientId: String,
    Quantity: { type: String },
    Ingradients: [{
        quantity: String,
        name: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredients' },
        isoptional:{type:Boolean,default:false},
        ingradientClientId: String,
    }],
    Sides: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Sides' }
    ],
    OptionalSides:[],
    Production: [{
        quantity: String,
        name: { type: mongoose.Schema.Types.ObjectId, ref: 'Production' },
        isoptional:{type:Boolean,default:false},
        ProductionClientId: String,
    }],
    variations: [],
    image: { type: String },
    created_at:  { type : Date, default: Date.now },
    updated_at:  { type : Date, default: Date.now },
    created_by: String,
    updated_by: String,
    isactive: { type: Number, default: 1 },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clientId: { type: String },
    Edits: [],
    OrderGroup:{type: String, default: 'A' }
});

mongoose.model('Product', ProductSchema);


import mongoose from "mongoose";

// Base User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum:["Customer", "Admin", "DeliveryPartner"]
    },
    isActivated:{
        type: Boolean,
        default: false
    }
});

// Customer Schema
const customerSchema = new mongoose.Schema({
    ...userSchema,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
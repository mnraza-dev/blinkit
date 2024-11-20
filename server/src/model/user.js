import mongoose from "mongoose";

// Base User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["Customer", "Admin", "DeliveryPartner"]
    },
    isActivated: {
        type: Boolean,
        default: false
    }
});

// Customer Schema

const customerSchema = new mongoose.Schema({
    ...userSchema.obj,
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ["Customer"],
        default: "Customer"
    },
    liveLocation: {
        latitude: { type: Number },
        longitude: { type: Number }
    }
    ,
    address: {
        type: String,
    },

});

// Delivery Partner Schema

const deliveryPartnerSchema = new mongoose.Schema({
    ...userSchema.obj,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ["DeliveryPartner"],
        default: "DeliveryPartner"
    },
    liveLocation: {
        latitude: { type: Number },
        longitude: { type: Number }
    }
    ,
    address: {
        type: String,
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",

    },
    vehicleType: {
        type: String,
        required: true
    },
}
);

// Admin Schema

const adminSchema = new mongoose.Schema({
    ...userSchema.obj,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin"],
        default: "Admin"
    },

});


export const Customer = mongoose.model("Customer", customerSchema);
export const DeliveryPartner = mongoose.model("DeliveryPartner", deliveryPartnerSchema);
export const Admin = mongoose.model("Admin", adminSchema);
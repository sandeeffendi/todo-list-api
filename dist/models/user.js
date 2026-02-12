import mongoose, { Schema, Document, Model } from "mongoose";
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        index: true,
        lowercase: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const User = mongoose.model("user", UserSchema);
export default User;
//# sourceMappingURL=user.js.map
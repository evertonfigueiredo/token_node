import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("user", usuarioSchema);
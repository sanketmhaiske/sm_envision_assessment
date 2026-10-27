import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
})

const UserModel = models.user || model('user', userSchema);
export default UserModel;


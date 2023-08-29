import mongoose, {Schema, Document, Model} from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    memories?: mongoose.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {};

interface IUserModel extends Model<IUserDocument> {
    build(args: IUser): IUserDocument;
}

const UserSchema: Schema<IUser> = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    memories: {
        type: [mongoose.Types.ObjectId],
        default: []
    }
}, {timestamps: true});


UserSchema.pre('save', async function(next) {

    try {
        if (!this.isModified('password')) {
            return next()
        }
    
        const existingUser = await User.findOne({ email: this.email });
            if (existingUser) {
                const error = new Error('Email address is already in use.');
                return next(error);
            }
    
        const hash = await bcrypt.hash(this.password, await bcrypt.genSalt());
        this.password = hash;
        next()
    } catch (error) {
        next()
    }
    
})

UserSchema.statics.build = (args: IUser) => {
    return new User(args)
  }
  
const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema)
export default User;
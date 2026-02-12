import { Document, Model } from "mongoose";
interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    UpdatedAt: Date;
}
declare const User: Model<IUser>;
export default User;
//# sourceMappingURL=user.d.ts.map
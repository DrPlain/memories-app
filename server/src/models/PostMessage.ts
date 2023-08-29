import mongoose, {Document, Schema, Model} from "mongoose";

export interface IPostMessage {
  title: string;
  message: string;
  author: string;
  tags?: string[];
  selectedFile?: string;
  likeCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPostMessageDocument extends IPostMessage, Document {}

interface IPostMessageModel extends Model<IPostMessageDocument> {
  build(args: IPostMessage): IPostMessageDocument;
}

const PostSchema: Schema<IPostMessage> = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  message: {
    type: String,
    required: [true, 'A message is required to create a post']
  },
  author: {
    type: String,
    required: [true, 'An author is required to create a post']
  },
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  }
}, {timestamps: true});

PostSchema.statics.build = (args: IPostMessage) => {
  return new PostMessage(args)
}
const PostMessage = mongoose.model<IPostMessageDocument, IPostMessageModel>("PostMessage", PostSchema);
export default PostMessage;

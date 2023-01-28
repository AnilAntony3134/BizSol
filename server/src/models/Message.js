import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true,
    },
    incentive: {
      type: Number,
    },
    category: {type: [String]},
    solutions: {type: [mongoose.Schema.Types.ObjectId], ref: 'Solutions'},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    difficulty: {type: String},
    public: {type: Boolean},
    winnerDeclared: {
      type: String,
      default: false
    }
  },
  { timestamps: true },
);

messageSchema.methods.toJSON = function () {
  return {
    id: this._id,
    title: this.title,
    text: this.text,
    category: this.category,
    incentive: this.incentive,
    difficulty: this.difficulty,
    public: this.public,
    winnerDeclared: this.winnerDeclared,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    user: this.user.toJSON(),
  };
};

export const validateMessage = (message) => {
  const schema = {
    title: Joi.string().min(5).max(200).required(),
    text: Joi.string().min(5).required(),
    category: Joi.array(),
    incentive: Joi.number(),
    difficulty: Joi.string(),
    public: Joi.boolean(),
    winnerDeclared: Joi.boolean()

  };
  return Joi.validate(message, schema);
};

const Message = mongoose.model('Message', messageSchema);

export default Message;

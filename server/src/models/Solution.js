import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const solutionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
    message: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Message',
        required: true,
    },
    organisation: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    shortlisted: {
      type: Boolean,
      required: false,
      default: false
    },
    selected: {
      type: Boolean,
      required: false,
      default: false
    },
    price: {
      type: Number,
      required: false,
      default: 0
    }
  },
  { timestamps: true },
)

solutionSchema.methods.toJSON = function () {
  return {
    id: this._id,
    title: this.title,
    solution: this.solution,
    message: this.message.toJSON(),
    organisation: this.organisation.toJSON(),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    shortlisted: this.shortlisted,
    selected: this.selected,
    price: this.price,
    user: this.user.toJSON(),
  };
};

export const validateMessage = (message) => {
  const schema = {
    title: Joi.string().min(5).required(),
    solution: Joi.string().min(5).required(),
    message: Joi.string().required(),
    organisation: Joi.string().required(),
    user: Joi.string().required(),
    shortlisted: Joi.boolean(),
    selected: Joi.boolean(),
    price: Joi.number(),
  };
  return Joi.validate(message, schema);
};

const Solution = mongoose.model('Solution', solutionSchema);

export default Solution;

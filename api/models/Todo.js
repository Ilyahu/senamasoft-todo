import { Schema, model} from 'mongoose'

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  }
})

export default model('Todo', TodoSchema)
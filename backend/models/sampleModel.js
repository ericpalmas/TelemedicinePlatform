import mongoose from 'mongoose'

const sampleSchema = mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    sensor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Sensor',
    },
  },
  {
    timestamps: true,
  },
)

const Sample = mongoose.model('Sample', sampleSchema)

export default Sample

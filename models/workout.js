const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now()
        },
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: "exercise type"
                },
                name: {
                    type: String,
                    trim: true,
                    required: "exercise name"
                },
                weight: {
                    type: Number
                },
                sets: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                duration: {
                    type: Number,
                    required: "exercise duration"
                },
                distance: {
                    type: Number
                }
            }
        ],
        totalDuration: {
            type: Number
        }
    }
);

const Workout = mongoose.model("Workout", workoutSchema);


module.exports = Workout;
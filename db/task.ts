import { Schema, model, models } from 'mongoose';

const taskSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'project',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    deadline: {
        type: Date,
        default: null,
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium',
    },
}, { timestamps: true })

const TaskModel = models.task || model('task', taskSchema);
export default TaskModel;


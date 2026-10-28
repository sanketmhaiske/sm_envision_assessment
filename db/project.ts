import { Schema, model, models } from 'mongoose';

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    seedId: {
        type: Number,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium',
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Completed', 'On Hold'],
        default: 'Pending',
    },
    projectType: {
        type: String,
        required: true,
        enum: ['Web Application', 'Website', 'Mobile App', 'UI/UX Design', 'E-commerce', 'API & Backend', 'SaaS Platform', 'Branding & Identity', 'Digital Marketing', 'Maintenance & Support'],
        default: 'Web Application',
    },
    deadline: {
        type: Date,
        default: null,
    }
}, { timestamps: true })

const ProjectModel = models.project || model('project', projectSchema);
export default ProjectModel;


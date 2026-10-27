
export const validateProjectData = async (data: any) => {
    const { title, description, projectType, status, priority, deadline } = data;

    if (!title?.trim()) return "Title is required";
    if (!description?.trim()) return "Description is required";

    if (!["Web Application", "Website", "Mobile App", "UI/UX Design", "E-commerce", "API & Backend", "SaaS Platform", "Branding & Identity", "Digital Marketing", "Maintenance & Support"].includes(projectType)) {
        return "Invalid project type";
    }

    if (!["Active", "Completed", "On Hold"].includes(status)) {
        return "Invalid status";
    }

    if (!["Low", "Medium", "High"].includes(priority)) {
        return "Invalid priority";
    }

    if (!deadline || isNaN(Date.parse(deadline))) {
        return "Valid deadline is required";
    }

    return null; // Valid
};
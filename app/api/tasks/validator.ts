
export const validateTaskData = async (data: any) => {
    const { projectId, title, description, status, priority, deadline } = data;
     const today = new Date().toISOString().split("T")[0];

    if (!projectId) return "Project ID is required";

    if (!title?.trim()) return "Title is required";
    if (!description?.trim()) return "Description is required";

    if (!["Pending", "In Progress", "Completed", "Cancelled"].includes(status)) {
        return "Invalid status";
    }

    if (!["Low", "Medium", "High"].includes(priority)) {
        return "Invalid priority";
    }

    if (!deadline || isNaN(Date.parse(deadline))) {
        return "Valid deadline is required";
    }

    if (!deadline || deadline < today) {
        return "Valid future deadline is required";
    }

    return null; // Valid
};
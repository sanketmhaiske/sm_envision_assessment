
export const getProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?reqType=all`, {
        cache: "no-store",
    });
    const projects = await res.json();
    return projects.result;
}

export const getAllTasks = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
        cache: "no-store",
    });
    const tasks = await res.json();
    return tasks.result;
}

export const getProjectTasks = async (projectId: string) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks?reqType=project_tasks&projectId=${projectId}`
    const res = await fetch(url, {
        cache: "no-store",
    });
    const tasks = await res.json();
    return tasks.result;
}

export const postProject = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.message || "Failed to create project");
    }
    return result.result;
}

export const deleteProject = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
        method: "DELETE",
        body: JSON.stringify(data),
    });
    const projects = await res.json();
    return projects.result;
}

export const getProjectDetails = async (projectId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?reqType=details&projectId=${projectId}`, {
        method: "GET",
    });
    const projects = await res.json();
    return projects.result;
}

export const updateProject = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    const { result } = await res.json();
    return result;
}

// Task API
export const addTask = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to create task");
    }
    return result.result;
}

export const deleteTask = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
        method: "DELETE",
        body: JSON.stringify(data),
    });
    const { result } = await res.json();
    if (!res.ok) {
        throw new Error(result.message || "Failed to delete task");
    }
    return result;
}

export const getTaskDetails = async (taskId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks?reqType=details&taskId=${taskId}`, {
        method: "GET",
    });
    const { result } = await res.json();
    return result;
}

export const updateTask = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks?reqType=update`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    const { result } = await res.json();
    return result;
}

export const updateTaskStatusChange = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks?reqType=status_change`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    const { result } = await res.json();
    if (!res.ok) {
        throw new Error(result.message || "Failed to create task");
    }
    return result;
}

export const getProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
        cache: "no-store",
    });
    const projects = await res.json();
    return projects.result;
}

export const getTasks = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
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
    const projects = await res.json();
    return projects.result;
}
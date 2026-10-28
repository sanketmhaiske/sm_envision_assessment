import axios from 'axios'

export const axiosClient = axios.create({
    baseURL: process.env.BASE_URL as string,
    timeout: 100000,
});

export const axiosClientWithToken = axios.create({
    baseURL: process.env.BASE_URL as string,
    timeout: 100000,
});


axiosClientWithToken.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClientWithToken.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== "undefined") {
            localStorage.removeItem("token");
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export const login = async (data: any) => {
    const res = await axiosClient.post('/api/login', data)
    return res;
}

export const getProjects = async (): Promise<any> => {
    const res = await axiosClientWithToken.get('/api/projects?reqType=all')
    return res?.data?.result;
}

export const getAllTasks = async () => {
    const res = await axiosClientWithToken.get('/api/tasks?reqType=all')
    return res?.data?.result;
}

export const getProjectTasks = async (projectId: string) => {
    const res = await axiosClientWithToken.get(`/api/tasks?reqType=project_tasks&projectId=${projectId}`)
    return res?.data?.result;
}

export const postProject = async (data: any) => {
    const res = await axiosClientWithToken.post(`/api/projects`, data)
    return res?.data?.result;
}

export const deleteProject = async (data: any) => {
    const res = await axiosClientWithToken.delete(`/api/projects`, {
        data
    })
    return res?.data?.result;
}

export const getProjectDetails = async (projectId: string) => {
    const res = await axiosClientWithToken.get(`/api/projects?reqType=details&projectId=${projectId}`)
    return res?.data?.result;
}

export const updateProject = async (data: any) => {
    const res = await axiosClientWithToken.put(`/api/projects`, data)
    return res?.data?.result;
}

export const addTask = async (data: any) => {
    const res = await axiosClientWithToken.post(`/api/tasks`, data)
    return res;
}

export const deleteTask = async (data: any) => {
    const res = await axiosClientWithToken.delete(`/api/tasks`, {
        data
    })
    return res;
}

export const getTaskDetails = async (taskId: string) => {
    const res = await axiosClientWithToken.get(`/api/tasks?reqType=details&taskId=${taskId}`)
    return res;
}

export const updateTask = async (data: any) => {
    const res = await axiosClientWithToken.put(`/api/tasks?reqType=update`, data)
    return res;
}

export const updateTaskStatusChange = async (data: any) => {
    const res = await axiosClientWithToken.put(`/api/tasks?reqType=status_change`, data)
    return res;
}
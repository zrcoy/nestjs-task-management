export const TASK_MESSAGES = {
  error: {
    TASK_NOT_FOUND: (id: string) => `Task with id ${id} not found`,
    FAILED_TO_GET_TASKS: (user: string, filters: string) =>
      `Failed to get tasks for user "${user}". Filters: ${filters}`,
    FAILED_TO_CREATE_TASK: (user: string, task: string) =>
      `Failed to create task for user "${user}". Task: ${task}`,
    FAILED_TO_UPDATE_TASK: (id: string, user: string, status: string) =>
      `Failed to update task with id ${id} for user "${user}". Status: ${status}`
  },
  verbose: {
    GETTING_TASKS: (user: string, filters: string) =>
      `User "${user}" retrieving all tasks. Filters: ${filters}`,
    CREATING_TASK: (user: string, task: string) =>
      `User "${user}" creating a new task. Task: ${task}`,
    GETTING_TASK_BY_ID: (id: string, user: string) =>
      `User "${user}" retrieving task by ID: ${id}`,
    DELETE_TASK_BY_ID: (id: string, user: string) =>
      `User "${user}" deleting task by ID: ${id}`,
    UPDATE_TASK_STATUS: (id: string, user: string, status: string) =>
      `User "${user}" updating task with id ${id}. Status: ${status}`
  }
};

export const TASK_ROUTES = {
  TASK_ROOT: 'tasks',
  TASK_ID: '/:id',
  TASK_UPDATE_STATUS: '/:id/status'
};

export const TASK_PARAMS = {
  ID: 'id'
};

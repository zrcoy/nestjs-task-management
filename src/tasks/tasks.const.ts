export const TASK_ERROR_MESSAGES = {
  TASK_NOT_FOUND: (id: string) => `Task with id ${id} not found`
};

export const TASK_ROUTES = {
  TASK_ROOT: 'tasks',
  TASK_ID: '/:id',
  TASK_UPDATE_STATUS: '/:id/status'
};

export const TASK_PARAMS = {
  ID: 'id'
};

cd  /app/manager-task-api

node ace migration:run --force
dumb-init node server.js
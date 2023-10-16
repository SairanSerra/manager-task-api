/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})
Route.get('/', async (response) => {
  return response.response.redirect().toPath('/health')
})

Route.group(() => {
  Route.post('/user/create', 'UsersController.create')
  Route.post('/login', 'AuthController.login')

  Route.group(() => {
    Route.get('/task', 'TasksController.index')
    Route.get('/task/specific', 'TasksController.specific')
    Route.post('/task', 'TasksController.store')
    Route.put('/task', 'TasksController.update')
    Route.delete('/task', 'TasksController.delete')
    Route.post('/loggout', 'Authcontroller.loggout')
  }).middleware('auth:api')
}).prefix('v1')

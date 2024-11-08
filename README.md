### Start app
* `make up` - start app
* http://localhost:3001 - backend
* http://localhost:5050 - pgadmin
  * host: `host.docker.internal` (from docker) or `localhost`
  * port: `5432`
  * db: `postgres`
  * user: `postgres`
  * password: `brainiac`

### Migrations
* start app
* `make migrate_up` - run migrations
* `make migrate_down` - revert migrations

### Troubleshooting
* if you get `Cannot find module '...' or its corresponding type declarations` - build the new docker image of the app
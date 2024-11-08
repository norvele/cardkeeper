build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

migrate_up:
	docker exec backend yarn migrate up

migrate_down:
	docker exec backend yarn migrate down
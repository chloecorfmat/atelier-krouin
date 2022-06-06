.PHONY: up
up:
	docker-compose up -d --build

.PHONY: down
down:
	docker-compose down

.PHONY: install
install:
	docker-compose exec strapi npm install
	docker-compose exec strapi npm run build

.PHONY: build
build:
	docker-compose exec strapi npm run build --clean

.PHONY: start
start:
	docker-compose exec strapi npm start

.PHONY: develop
develop:
	docker-compose exec strapi npm run develop

.PHONY: production
production:
	docker-compose -f docker-compose.production.yml up -d 

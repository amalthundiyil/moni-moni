include .env

.PHONY: install-dev backend-start frontend-start pip-compile reset-db seed-db delete-db clean deploy verify-all

install-dev:
	$(MAKE) env
	@echo "\nInstalling backend dependencies\n"
	@pip install -e .'[dev]'
	@echo "\nInstalling frontend dependencies\n"
	@cd moni-moni/client && npm install && cd ../..

env:
	@echo "Setting environment variables\n"
	@cp .env moni-moni/server/.env && cp .env moni-moni/client/.env

frontend-start:
	@cp .env moni-moni/client/.env
	@cd moni-moni/client && npm start

verify-all:
	@echo "Connecting to database -> $(DATABASE_URL)"
	@psql $(DATABASE_URL) -c "UPDATE users_customuser SET is_verified=True;"

reset-images:
	@echo "Connecting to database -> $(DATABASE_URL)"
	@psql $(DATABASE_URL) -c "UPDATE catalogue_fundraiser SET image='images/default.png';"


backend-start:
	@cp .env moni-moni/server/.env
	@python moni-moni/server/manage.py runserver

deploy:
	@bash scripts/deploy_heroku.sh

migrate:
	@python moni-moni/server/manage.py makemigrations
	@python moni-moni/server/manage.py migrate

pip-compile:
	@pip-compile -v moni-moni/server/requirements.in

reset-db:
	@echo "Connecting to database -> $(DATABASE_URL)"
	@psql $(DATABASE_URL) -c "DROP DATABASE moni_moni_db; CREATE DATABASE moni_moni_db;"
	@bash scripts/delete_migrations.sh
	$(MAKE) migrate
	# $(MAKE) seed-db

delete-db:
	@bash . .env
	@python scripts/delete_db.py

seed-db:
	@bash scripts/seed.sh

clean:
	@rm -rf ./venv

.PHONY: install-dev backend-start frontend-start pip-compile reset-db seed-db delete-db clean

install-dev:
	@echo "Setting environment variables\n"
	@cp .env moni-moni/server/.env
	@cp .env moni-moni/client/.env
	@echo "\nInstalling backend dependencies\n"
	@pip install -r moni-moni/server/requirements.txt
	@echo "\nInstalling frontend dependencies\n"
	@cd moni-moni/client && npm install && cd ../..

frontend-start:
	@cp .env moni-moni/client/.env
	@cd moni-moni/client && npm start

backend-start:
	@cp .env moni-moni/server/.env
	@python moni-moni/server/manage.py runserver

migrate:
	@python moni-moni/server/manage.py makemigrations
	@python moni-moni/server/manage.py migrate

pip-compile:
	@pip-compile -v moni-moni/server/requirements.in

reset-db:
	@export $(grep -v "^#" .env | xargs)
	@echo "Connecting to: $(DATABASE_URL)"
	@psql "$(DATABASE_URL)" -c "DROP DATABASE moni_moni_db; CREATE DATABASE moni_moni_db;"
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
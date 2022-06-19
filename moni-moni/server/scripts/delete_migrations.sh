find ../ -path "*/migrations/*.py" -not -path "../venv/*" -not -name "__init__.py" -delete
find ../ -path "*/migrations/*.pyc" -not -path "../venv/*" -delete
#!/bin/bash


echo "Creating the volume..."

kubectl apply -f ./kubernetes/postgres-storage.yaml

echo "Creating the database credentials..."

kubectl delete secret secrets --ignore-not-found=true
kubectl create secret generic secrets --from-env-file=.env

echo "Creating the postgres deployment and service..."

kubectl create -f ./kubernetes/postgres.yaml

# POD_NAME=$(kubectl get pod -l service=postgres -o jsonpath="{.items[0].metadata.name}")
# kubectl exec $POD_NAME --stdin --tty -- createdb -U sample books


echo "Creating the backend deployment and service..."

kubectl create -f ./kubernetes/backend.yaml

# FLASK_POD_NAME=$(kubectl get pod -l app=flask -o jsonpath="{.items[0].metadata.name}")
# kubectl exec $FLASK_POD_NAME --stdin --tty -- python manage.py recreate_db
# kubectl exec $FLASK_POD_NAME --stdin --tty -- python manage.py seed_db


# echo "Adding the ingress..."

# minikube addons enable ingress
# kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
# kubectl apply -f ./kubernetes/ingress.yaml


echo "Creating the frontend deployment and service..."

kubectl create -f ./kubernetes/frontend.yaml


# echo "Adding the minikube ip..."
# echo "$(minikube ip) ipay.com" | sudo tee -a /etc/hosts
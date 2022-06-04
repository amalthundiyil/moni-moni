#!/bin/bash


echo "Creating the volume..."

kubectl apply -f ./kubernetes/postgres-storage.yaml

echo "Creating the database credentials..."

kubectl delete secret secrets --ignore-not-found=true
kubectl create secret generic secrets --from-env-file=.env

echo "Creating the postgres deployment and service..."

kubectl apply -f ./kubernetes/postgres.yaml

echo "Creating the backend deployment and service..."

kubectl apply -f ./kubernetes/backend.yaml

echo "Adding the ingress..."

minikube addons enable ingress
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
kubectl apply -f ./kubernetes/ingress.yaml


echo "Creating the frontend deployment and service..."

kubectl apply -f ./kubernetes/frontend.yaml


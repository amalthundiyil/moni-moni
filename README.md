# IPay - A payment app

This is a payments app to issue microcredit loans or donations for the rural poor who turn to private
moneylenders and also offer them a better alternative than keeping track of finances using passbooks.

Technologies used: Django, React, PostgreSQL, Docker, Nginx, Terraform, Kubernetes, AWS.

## Want to use this project?

### Docker

Build the images and spin up the containers:

```sh
$ docker-compose up -d --build
```

Test it out at:

1. [http://localhost:8000/](http://localhost:8000/)
1. [http://localhost](http://localhost)

### Kubernetes

#### Minikube

Install and run [Minikube](https://kubernetes.io/docs/setup/minikube/):

1. Install a [Hypervisor](https://kubernetes.io/docs/tasks/tools/install-minikube/#install-a-hypervisor) (like [VirtualBox](https://www.virtualbox.org/wiki/Downloads) or [HyperKit](https://github.com/moby/hyperkit)) to manage virtual machines
1. Install and Set Up [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) to deploy and manage apps on Kubernetes
1. Install [Minikube](https://github.com/kubernetes/minikube/releases)

Start the cluster:

```sh
$ minikube start --vm-driver=virtualbox
$ minikube dashboard
```

From here you can execute the `./deploy.sh` file or follow the instructions below it. Both will give you the same result.

For executing `./deploy.sh`:

```sh
chmod +x ./deploy.sh
./deploy.sh
```

#### Volume

Create the volume and the claim:

```sh
$ kubectl apply -f ./kubernetes/postgres-storage.yml
```

#### Secrets

Create the secret object:

For secret as `.yml`

```sh
$ kubectl apply -f ./kubernetes/secret.yml
```

otherwise from `.env` file

```sh
kubectl create secret generic secrets --from-env-file=.env
```

#### Postgres

Create deployment:

```sh
$ kubectl create -f ./kubernetes/postgres.yml
```

#### Django

Build and push the image to Docker Hub:

```sh
$ docker build -t amalthundiyil/backend ./services/server
$ docker push amalthundiyil/backend
```

> Make sure to replace `amalthundiyil` with your Docker Hub namespace in the above commands as well as in _kubernetes/backend.yml_

Create the deployment and service:

```sh
$ kubectl create -f ./kubernetes/backend.yml
```

Apply the migrations and seed the database:

```sh
$ kubectl get pods
$ kubectl exec django-<POD_IDENTIFIER> --stdin --tty -- python manage.py recreate_db
$ kubectl exec django-<POD_IDENTIFIER> --stdin --tty -- python manage.py seed_db
```

#### Ingress

Enable and apply:

```sh
$ minikube addons enable ingress
$ kubectl apply -f ./kubernetes/ingress.yml
```

Add entry to _/etc/hosts_ file:

```
<MINIKUBE_IP>payment.app
```

Try it out:

1. [http://payment.app/](http://payment.app/)

#### React.js

Build and push the image to Docker Hub:

```sh
$ docker build -t amalthundiyil/frontend ./services/client \
    -f ./services/client/Dockerfile-minikube

$ docker push amalthundiyil/frontend
```

> Again, replace `amalthundiyil` with your Docker Hub namespace in the above commands as well as in _kubernetes/vue-deployment.yml_

Create the deployment and service:

```sh
$ kubectl create -f ./kubernetes/frontend.yml
```

Try it out at [http://payment.app/](http://payment.app/).

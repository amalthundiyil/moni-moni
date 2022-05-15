![Screenshot from 2022-05-15 09-06-35](https://user-images.githubusercontent.com/90337323/168456070-a0d9faec-b2ef-46b4-987d-8c3d1b640781.png)

# Moni Moni

![Build](https://github.com/amal-thundiyil/moni-moni/actions/workflows/actions.yml/badge.svg)
![License](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)
![Views](https://views.whatilearened.today/views/github/MShawon/github-clone-count-badge.svg)
![Clones](https://img.shields.io/badge/dynamic/json?color=success&label=Clone&query=count&url=https://gist.githubusercontent.com/MShawon/cf89f3274d06170b8a4973039aa6220a/raw/clone.json&logo=github)

## Inspiration

Managing finances were always an issue for me, every few weeks I had to go ask my parents or friends for a bit of money just to get through the week, but then after a certain point I decided...**enough is enough**...I won't ask my parents for money...rather I'll ask a whole community for money, and thus Moni Moni was born.

## What it does

Moni Moni is fundamentally a crowdfunded small-scale loaning service. Users can post their loan requests along with the interest they can payback and the reason they want money for, other users can view the request and decide whether they want to invest in the person depending upon the interest rate and the reason for request.

## How we built it

Tech Stack: React.js, Django, PostgreSQL, Docker, AWS.

## Challenges we ran into

With the team being at different locations and different timezones, coordinating things were very difficult. And we faced a lot of technical difficulties some of which we were able to resolve.

## Accomplishments that we're proud of

This is our first hackathon and we are proud of how much we were able to complete, we surpassed our own expectations and makes us truly happy

## What we learned

First and foremost we learnt about teamwork, coordination with people we have never met before and communicating with them, it was an incredible experience for us all. Working on this project was not easy for us, we learnt new tech stacks watched youtube tutorials and spent hours further furnishing what we already knew.

## What's next for

There are a lot of loopholes legal and logical, our first and topmost priority is to work upon them. We are well aware of the potential for scam and a workaround is needed. We also wish to plan on integrating Blockchain transactions in the future.

## Want to use this project?

### Docker

Build the images and spin up the containers:

```sh
$ docker-compose up -d --build
```

Test it out at:

1. [http://localhost:8000/](http://localhost:8000/)

<!-- ### Kubernetes

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

Try it out at [http://payment.app/](http://payment.app/). -->

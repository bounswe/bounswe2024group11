# Load secrets from a .env file (optional)
ifneq (,$(wildcard .env.makefile))
	include .env.makefile
	export
endif

# variables
COMPOSE_FILE=docker-compose.dev.yml
CONTAINER_REPOSITORY=meminseeker/turquiz
SERVICES=backend client nginx

# Variables for the SCP command
PEM_FILE ?= $(PEM_FILE)
SSH_USER ?= $(SSH_USER)
SSH_HOST ?= $(SSH_HOST)
FILES_TO_COPY ?= $(FILES_TO_COPY)
TARGET_DIR ?= $(TARGET_DIR)

# command for building images from dev
dev-build:
	docker-compose -f $(COMPOSE_FILE) build

# command for pushing dev images to Docker Hub
dev-push:
	@for service in $(SERVICES); do \
		docker push $(CONTAINER_REPOSITORY):$$service; \
	done

# command for down containers
dev-down:
	@if [ -z "$(PEM_FILE)" ] || [ -z "$(SSH_USER)" ] || [ -z "$(SSH_HOST)" ] || [ -z "$(TARGET_DIR)" ] || [ -z "$(COMPOSE_FILE)" ]; then \
		echo "Error: Please set PEM_FILE, SSH_USER, SSH_HOST, TARGET_DIR, and COMPOSE_FILE environment variables"; \
		exit 1; \
	fi
	ssh -i $(PEM_FILE) $(SSH_USER)@$(SSH_HOST) \
	'cd $(TARGET_DIR) || { echo "Failed to change directory to $(TARGET_DIR)"; exit 1; }; \
	echo "Successfully changed directory to $(TARGET_DIR)"; \
	~/.docker/cli-plugins/docker-compose -f $(COMPOSE_FILE) down; \
	exit'

# command for SCP files to a remote server
dev-scp:
	@if [ -z "$(PEM_FILE)" ] || [ -z "$(SSH_USER)" ] || [ -z "$(SSH_HOST)" ] || [ -z "$(FILES_TO_COPY)" ] || [ -z "$(TARGET_DIR)" ]; then \
		echo "Error: Please set PEM_FILE, SSH_USER, SSH_HOST, FILES_TO_COPY, and TARGET_DIR environment variables"; \
		exit 1; \
	fi
	@for file in $(FILES_TO_COPY); do \
		if [ ! -f $$file ]; then \
			echo "Error: File $$file does not exist"; \
			exit 1; \
		fi; \
		scp -i $(PEM_FILE) $$file $(SSH_USER)@$(SSH_HOST):$(TARGET_DIR); \
	done

# command for deployment to a remote server
dev-up:
	@if [ -z "$(PEM_FILE)" ] || [ -z "$(SSH_USER)" ] || [ -z "$(SSH_HOST)" ] || [ -z "$(TARGET_DIR)" ] || [ -z "$(COMPOSE_FILE)" ] || [ -z "$(CONTAINER_REPOSITORY)" ] || [ -z "$(SERVICES)" ]; then \
		echo "Error: Please set PEM_FILE, SSH_USER, SSH_HOST, TARGET_DIR, COMPOSE_FILE, CONTAINER_REPOSITORY, and SERVICES environment variables"; \
		exit 1; \
	fi
	ssh -i $(PEM_FILE) $(SSH_USER)@$(SSH_HOST) \
	'cd $(TARGET_DIR) || { echo "Failed to change directory to $(TARGET_DIR)"; exit 1; }; \
	echo "Successfully changed directory to $(TARGET_DIR)"; \
	docker pull $(CONTAINER_REPOSITORY):backend; \
	docker pull $(CONTAINER_REPOSITORY):client; \
	docker pull $(CONTAINER_REPOSITORY):nginx; \
	~/.docker/cli-plugins/docker-compose -f $(COMPOSE_FILE) up -d; \
	~/.docker/cli-plugins/docker-compose -f docker-compose.dev.yml exec backend python manage.py migrate --noinput; \
	exit'

# Composition of the commands
dev-bp: dev-build dev-push
dev-dsu: dev-down dev-scp dev-up
dev-deploy: dev-bp dev-dsu

.PHONY: dev-build dev-push dev-down dev-scp dev-up dev-bp dev-dsu dev-deploy

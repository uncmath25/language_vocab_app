.PHONY: clean up down build deploy

LOCAL_PROXY_SERVER_URL="http://server:3030"

CLIENT_IMAGE_NAME="uncmath25/language-learning-app"
BUILD_FILE="build.tgz"
REMOTE_DIR_NAME="language_learning_app"
REMOTE_SERVER_PROFILE="testing-lab"
REMOTE_PARENT_WEBSITE_DIR="/home/player1/websites"

default: up

clean:
	@echo "*** Cleaning repo of unnecessary artifacts... ***"
	rm -rf $(REMOTE_DIR_NAME)
	rm -f $(BUILD_FILE)
	rm -rf server/node_modules
	rm -rf client/node_modules
	sudo rm -rf client_prod
	rm -f .env
	rm -f server/.env
	rm -f client/.env
	rm -f client/package_backup.json

up: clean
	@echo "*** Building and running the full node stack for interactive development... ***"
	@echo "*** REMEMBER to update volume mount points for docker-compose to your local repo location ***"
	cp .env.dev .env
	cp .env.dev server/.env
	cp .env.dev client/.env
	mv client/package.json client/package_backup.json
	jq '. + {"proxy": "'$(LOCAL_PROXY_SERVER_URL)'"}' client/package_backup.json > client/package.json
	docker-compose -f docker-compose.yml up -d --build --remove-orphans
	rm -f client/package.json
	mv client/package_backup.json client/package.json

down:
	@echo "*** Stopping full node dev stack... ***"
	docker-compose -f docker-compose.yml down --remove-orphans
	make clean

build: clean
	@echo "*** Building full node stack for production deployment... ***"
	@echo "*** (Using latest client image build from docker compose) ***"
	mkdir $(REMOTE_DIR_NAME)
	cp -r server $(REMOTE_DIR_NAME)/server
	cp .env.prod $(REMOTE_DIR_NAME)/server/.env
	cp -r client client_prod
	cp .env.prod client_prod/.env
	cd client_prod; \
	docker build -t $(CLIENT_IMAGE_NAME) .; \
	docker run --rm -v $$(pwd)/build:/usr/src/app/build --entrypoint /bin/sh $(CLIENT_IMAGE_NAME) -c "npm run build"
	cp -r client_prod/build $(REMOTE_DIR_NAME)/client
	sudo rm -rf client_prod
	cp .env.prod $(REMOTE_DIR_NAME)/client/.env
	tar -czvf $(BUILD_FILE) $(REMOTE_DIR_NAME)
	rm -rf $(REMOTE_DIR_NAME)

deploy:
	@echo "*** Deploying full node stack for production deployment... ***"
	@echo "*** Ensure that docker and npm are properly installed on the remote server ***"
	scp $(BUILD_FILE) $(REMOTE_SERVER_PROFILE):$(REMOTE_PARENT_WEBSITE_DIR)
	ssh $(REMOTE_SERVER_PROFILE) "\
		cd $(REMOTE_PARENT_WEBSITE_DIR); \
		rm -rf $(REMOTE_DIR_NAME); \
		tar -xzvf $(BUILD_FILE); \
		rm -rf $(BUILD_FILE); \
		cd $(REMOTE_DIR_NAME); \
		docker rm -f language-learning-app-api; \
		docker build -t uncmath25/language-learning-app-api server; \
		docker run --rm -d -p 3030:3030 --env-file server/.env --network host --name language-learning-app-api uncmath25/language-learning-app-api; \
	"
	@echo "*** Ensure that the nginx.conf is appended to the server's nginx.conf and restart the server's nginx ***"

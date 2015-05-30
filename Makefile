all: build
	docker run -it --link mymongo:mymongo -p 8888:8888 --rm --name mytemperature vykook/temperature


push: build
	docker push vykook/temperature

build:
	docker build -t vykook/temperature ./gui

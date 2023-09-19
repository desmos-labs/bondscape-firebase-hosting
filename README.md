# Bondscape Website

This repository contains the official Bondscape website that can be reached at [bondscape.app](https://bondscape.app).

## Development

This website is developed using [Next.js](https://nextjs.org).

### Local testing

To test this website on your local machine, just run the following command:

```
yarn serve
```

## Docker

In order to provide an easier deployment experience, we provide a Dockerfile that can be used to build and run the
website. In order to build the Docker image and then run it, you can use the following commands:

```shell
# First, build the Docker image
docker build -t desmoslabs/bondscape-website:latest .

# Then, run the image
docker run --name bondscape-website -p 5000:3000 desmoslabs/bondscape-website:latest 
```

After running this command, you will be able to reach the website at http://localhost:5000.
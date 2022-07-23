# VEL
Book rendering with Node & Typescript

![wallpaper](./muelle.jpeg)

### References

- [http://pdfkit.org/](http://pdfkit.org/)

## Architecture

### Overview

TBD

### Struecture

#### Configuration

|Link|Description|
|--|--|
|[persons](./persons)|Directory with YAML files with personal details that can be referenced.|
|[topics](./topics)|Directory with YAML files with topics details that can be referenced.|
|[config](./config)|Directory with YAML files with general configuration.|
|[books](./books)|Directory with YAML files defining books.|

#### Content

|Link|Description|
|--|--|
|[fonts](./fonts)|This directory contains the files defining fonts.|
|[images](./images)|This directory contains the images files that can be referenced.|

#### Application

|Link|Description|
|--|--|
|[render.js](./render.js)|The Node command line interface for rendering content.|
|[builds](./builds)|This directory containes the results of rendering the books.|
|[package.json](./package.json)|The JSON file with all the dependencies required by this application.|
|[src](./src)|This directory contains the Node code that implements this application.|
|[src/command.ts](./src/command.ts)|Application command line interface handler.|
|[src/enums](./src/enums)|Application constants.|
|[src/interfaces](./src/interfaces)|Application interfaces.|
|[src/models](./src/models)|Application models.|
|[src/serializers](./src/serializers)|Application serializer interfaces.|
|[src/products](./src/products)|Application products.|
|[src/adapter](./src/adapters)|Application adapters.|

## Instructions

### Installation

```bash
yarn install
```

### Rendering a PDF in English
```bash
yarn run build && yarn run render --book "Crypto" --language "en" --format "pdf"
```

### Rendering a PDF in Spanish
```bash
yarn run build && yarn run render --book "Crypto" --language "es" --format "pdf"
```

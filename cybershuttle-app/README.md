# cybershuttle-app

## Project Prerequisites

make sure you have npm installed, preferbly a version <17 and >15. Used npm 16 for this project.

## Project setup
```
nvm use 16
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```
code to update grpc_web and common js protos from protos folder:
```
protoc -I=./ authorization.proto --js_out=import_style=commonjs,binary:./ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./
protoc -I=./ appItems.proto --js_out=import_style=commonjs,binary:./ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./
```

### Compiles and minifies for production
```
npm run electron:build
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

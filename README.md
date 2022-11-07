# CRUD BACKEND

### Initial settings

```shell
$ yarn init -y
$ yarn add typescript @types/node ts-node-dev -D
$ npx tsc --init
```

### **tsconfig.json** updates

```json
"target": "es2020",
"rootDir": "./src",
"outDir": "./dist",
```

### **package.json** updates in **scripts** tag

```json
"dev": "ts-node-dev src/app.ts",
```

### Install and configure **express**

```
$ yarn add express
$ yarn add -D @types/express
```

## Development script

```
$ yarn dev
```

> References

- https://blog.soaresdev.com/como-criar-projeto-nodejs-expressjs-e-typescript/

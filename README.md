# nodetsapis

Node.js + Express + TypeScript + Prisma によるREST API。

## 開発環境

- node v16.14.0
- npm 8.3.1

## 開発環境構築

```cmd
mkdir nodetsapis
cd nodetsapis
npm init -y
npm install --save-dev typescript @types/node
npx tsc --init
```

tsconfig.jsonを編集する。

```cmd
npm install --save express
npm install --save-dev @types/express
mkdir src
npm install --save-dev ts-node-dev
```

package.jsonを編集する。

```json
"scripts": {
  "dev": "ts-node-dev --respawn src/index.ts",
  "start": "node build/src/index.js",
  "compile": "tsc",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

src/index.tsを作成する。

```ts
import express from "express";

const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

開発用サーバを起動する。

```cmd
npm run server
```

http://localhost:3000/ にアクセスし、```{"msg":"Hello World!"}```と表示されることを確認する。

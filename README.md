# nodetsapis

Node.js + Express + TypeScript + Prisma によるREST API。

## 開発環境

- node v16.14.0
- npm 8.3.1
- PostgreSQL 14.2

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
import express from "express"

const app = express()
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" })
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

Prismaをインストールする。

```cmd
npm install --save-dev prisma
npx prisma init
```

既にgitで管理しており、.gitignoreファイルが存在する場合は.envを含めるように警告が表示される。

```
warn You already have a .gitignore. Don't forget to exclude .env to not commit any secret.
警告あなたはすでに.gitignoreを持っています。シークレットをコミットしないように.envを除外することを忘れないでください。
```

.envのDATABASE_URLを編集する。

schema.prismaを編集する。

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}
```

マイグレーションを実行する。

```cmd
npx prisma migrate dev --name init
```

migration.sqlが生成されていることを確認する。

Prisma Studioを起動し、手動でデータを追加する。

```cmd
npx prisma studio
```

index.tsを編集する。

```ts
// ...
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// ...

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  res.json(users)
})

```

開発用サーバを起動する。

```cmd
npm run server
```

http://localhost:3000/users にアクセスし、登録したデータがJSON形式で表示されることを確認する。

## 参考

- [Express routing](http://expressjs.com/en/guide/routing.html)
- [Start from scratch with relational databases (15 min) | Prisma Docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres)
- [prisma-examples/typescript/rest-express at latest · prisma/prisma-examples](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express)
- [prisma と express でつくる REST API](https://zenn.dev/yamo/articles/prisma-express-rest-api#usercontroller)
- [[Prisma] チートシート - Qiita](https://qiita.com/koffee0522/items/92be1826f1a150bfe62e)

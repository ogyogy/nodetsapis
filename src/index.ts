import express from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const app = express()
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  res.json(users)
})

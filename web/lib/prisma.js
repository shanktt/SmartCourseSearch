import { PrismaClient } from '@prisma/client'

if (!global.prisma) {
  global.prisma = new PrismaClient()
}

// module.exports = global.prisma
export default prisma

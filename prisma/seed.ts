import { PrismaClient } from '@prisma/client';

//initialize prisma client
const prisma = new PrismaClient();

async function main() {
  //create dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma adds support for MongoDB' },
    update: {},
    create: {
      title: 'Prisma adds support for MongoDB',
      body: 'Support for mongodb has been one of the most requested features',
      description:
        'We are excited to share that todays Prisma ORM release adds stable support for MongoDB!',
      published: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'timkozemzak@gmail.com' },
    update: {},
    create: {
      first_name: 'Tim',
      last_name: 'Kozemzak',
      email: 'timkozemzak@gmail.com',
      role: 'Engineer',
    },
  });

  console.log({ post1, post2, user1 });
}

//execute main fn
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    //close prisma client
    await prisma.$disconnect();
  });

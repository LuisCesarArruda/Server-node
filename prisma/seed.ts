import {prisma} from "../src/lib/prisma"

async function seed() {
    await prisma.events.create({
        data:{
            id:"11c9d295-4977-4f45-abd1-a8858b874455" ,
            title: "unite summit",
            slug: "unite-summit",
            details: "evento para devs",
            maximumAttendees: 120
        }
    })
}

seed().then(()=>{
    console.log("DataBase Seeded")

    prisma.$disconnect()
})
const express = require('express')
const app = express()

app.use(express.json())

let heros = [
    {
        "id" : 1,
        "name" : "Superman",
        "title" : "The last son of Krypton",
        "house": "DC"
    },
    {
        "id" : 2,
        "name" : "Batman",
        "title" : "The dark Knight",
        "house": "DC"
    },
    {
        "id" : 3,
        "name" : "Spider-man",
        "title" : "The friendly neighborhood",
        "house": "Marvel"
    }
]


//const app = http.createServer((request, response) => {
  //  response.writeHead(200, { 'Content-Type': 'application/json' })
    //response.end(JSON.stringify(heros))
//})

app.get('/', (request, response) =>{
    response.send('<h1>HALLO</h1>')
})

app.get('/api/heros', (request, response) =>{
    response.json(heros)
})

app.get('/api/heros/:id', (request, response) =>{
    const id = Number(request.params.id)
    const hero = heros.find(hero => hero.id === id)
    
    if (hero) {
        response.json(hero)
    } else {
        response.status(404).end()
    }

})

app.delete('/api/heros/:id', (request, response) =>{
    const id = Number(request.params.id)
    heros = heros.filter(hero => hero.id !== id )
    response.status(204).end()
})

app.post('api/heros', (request, response) => {
    const hero = request.body

    if (!hero || !hero.name){
        return response.status(400).json({
            error: 'hero.name is missing'
        })
    }

    const ids = heros.map(hero => hero.id)
    const maxId = Math.max(...ids)

    const NewHero = {
        id : maxId + 1 ,
        name: hero.name ,
        title: hero.title ,
        house: hero.house
    } 

    heros = heros.concat(NewHero)

    response.status(201).json(NewHero)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

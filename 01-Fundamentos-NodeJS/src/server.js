import http from 'node:http'

const users = []

const server = http.createServer((request, response) => {
  const { method, url } = request
  console.log(method, url)

  if (method === 'GET' && url === '/users') {
    return response
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      nome: 'Elton Mozart',
      email: 'elton.mozart@gmail.com'
    })
    return response.end('Criação de usuário')
  }

  return response.end('Hello world!!!!')
})

server.listen(3333)

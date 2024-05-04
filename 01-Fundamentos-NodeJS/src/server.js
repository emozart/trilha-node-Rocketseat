import http from 'node:http'

const users = []

const server = http.createServer(async (request, response) => {
  const { method, url } = request
  console.log(method, url)

  const buffers = []

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    request.body = null
  }

  if (method === 'GET' && url === '/users') {
    return response
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = request.body
    users.push({
      id: 1,
      name,
      email
    })
    return response.end('Criação de usuário')
  }

  return response.end('Hello world!!!!')
})

server.listen(3333)

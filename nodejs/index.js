'use strict'

const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  let body = ''

  req.on('error', (err) => {
    console.error('Request failed!')
    console.error(err)
    res.statusCode = 500
    res.write(`ERROR: ${err.message}`)
    res.end()
  })

  req.on('data', (data) => body += data.toString('utf8'))
  req.on('end', async () => {
    try {
      const payload = JSON.parse(body)
      for (let i = 0; i < payload.length; ++i) {
        const target = payload[i]
        if (!target.url) {
          continue
        }

        await makeRequest(target.url, JSON.stringify(target.arguments))
        await delay(1000)
      }
    } catch (err) {
      console.error('Parsing body failed!')
      console.error(err)
      res.statusCode = 500
      res.write(`ERROR: ${err.message}`)
    }

    res.end()
  })
})

server.listen(process.env.PORT || 8080, () => console.log('listening!'))

function makeRequest(endpoint, body) {
  console.log(`Hitting ${endpoint}`)
  const opts = url.parse(endpoint)
  opts.method = 'POST'
  opts.headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body).toString()
  }

  return new Promise((resolve, reject) => {
    const req = http.request(opts, (res) => {
      res.resume()
      res.on('error', reject)
      res.on('end', resolve)
    })

    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

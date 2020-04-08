/* eslint-disable no-console */
const fetch = require('node-fetch')
const fs = require('fs')
const API_HOST = 'https://gx-boa-graphql-api-test.azurewebsites.net'
const path = require('path')

const args = process.argv.slice(2)
const token = args[0]
console.log(token)

if (!token) {
  console.log(
    'Please pass the token as first argument: node file.js "Bearer abcd..."'
  )
  process.exit()
}

fetch(`${API_HOST}/graphql`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    authorization: token,
  },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      (type) => type.possibleTypes !== null
    )
    result.data.__schema.types = filteredData
    fs.writeFile(
      path.join(__dirname, '/fragmentTypes.json'),
      JSON.stringify(result.data),
      (err) => {
        if (err) {
          console.error('Error writing fragmentTypes file', err)
        } else {
          console.log('Fragment types successfully extracted!')
        }
      }
    )
  })
  .catch((err) => {
    console.log(err)
  })

const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })


nightmare
  .goto('https://vk.com')
  .end()
  .then(console.log)
  .catch(error => {
    console.error('Search failed:', error)
  })

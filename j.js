const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

nightmare
    // it *really* goes to this URL, which will fail
    .goto('www.vk.com')
    .catch(function(error) {
        // only handle errors from the `evaluate` action
        if (error.message && error.message.includes('Evaluation')) {
            return nightmare
                // now we'll never get here if the page failed to load, so no
                // need to worry about this `evaluate` call timing out.
                .evaluate(() => document.documentElement.outerHTML)
                .then(function(html) { /
                 console.log(html);
                                     });
        }
        throw error;
    })
    .catch(function(error) { console.error(error); });

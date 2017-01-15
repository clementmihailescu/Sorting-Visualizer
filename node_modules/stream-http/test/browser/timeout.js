var test = require('tape')

var http = require('../..')

var skipTimeout = ((browserName === 'Opera' && browserVersion <= 12) ||
    (browserName === 'Safari' && browserVersion <= 5))


test('emits timeout events', function (t) {
    if (skipTimeout) {
        return t.skip('Browser does not support setting timeouts')
    }

    var req = http.request({
        path: '/basic.txt',
        timeout: 1
    })

    req.on('timeout', function () {
        t.end() // the test will timeout if this does not happen
    })

    req.end()
})

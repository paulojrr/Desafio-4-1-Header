const fs = require('fs');
const data = require('./data.json')

exports.post = function (req, res) {

    let { avar_url, name, birth, education, class_type, occupation } = req.body;

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please fill all inputs")
        }
    }

    data.instructors.push({
        avar_url, 
        name, 
        birth, 
        education, 
        class_type, 
        occupation
    })

    fs.writeFile('./data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Writer fail!")

        res.redirect('teachers')
    })
}
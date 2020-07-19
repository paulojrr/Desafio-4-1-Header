const fs = require('fs');
const data = require('./data.json')
const { age, graduation, date } = require('./utils.js')

exports.show = function (req, res) {

    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    }) 
        
    if(!foundTeacher) return res.send("Teacher not found.")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        graduation: graduation(foundTeacher.education),
        occupation: foundTeacher.occupation.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at),       
    }
    
    return res.render('teachers/show', {teacher})
}

exports.edit = function (req, res) {

    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    }) 

    if(!foundTeacher) return res.send("Teacher not found.")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render('teachers/edit', { teacher })
}

exports.post = function (req, res) {

    let { avatar_url, name, birth, education, class_type, occupation } = req.body;

    const keys = Object.keys(req.body)

    const id = Number(data.teachers.length + 1)
    const created_at = Date.now()
    birth = Date.parse(birth)


    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please fill all inputs")
        }
    }

    data.teachers.push({
        id,
        avatar_url,
        created_at,
        name, 
        birth, 
        education, 
        class_type, 
        occupation
    })

    fs.writeFile('./data.json', JSON.stringify(data, null, 2), function (err) { if (err) return res.send("Writer fail!")
        
        return res.render('teachers/index')
    })
}



const fs = require('fs');
const data = require('./data.json')
const { age, graduation, date } = require('./utils.js')

exports.index = function (req, res) {

    res.render('teachers/index', { teachers : data.teachers })
}

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
        
        return res.redirect('/teachers')
    })
}

exports.put = function (req, res) {
    
    const { id } = req.body

    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if (teacher.id == id) {
            index = foundIndex
            return true
        }
    }) 

    if(!foundTeacher) return res.send("Teacher not found.")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile('./data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write error!')

        return res.redirect(`/teachers/${id}`)
    })
}

exports.delete = function ( req, res) {

    const {id} = req.body

    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('./data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write error!')
    })

    return res.redirect('/teachers')
}


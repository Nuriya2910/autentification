// const { title } = require('process')
const Teacher = require('../models/Teacher')

exports.index = async (req, res) => {
    let data = await Teacher.find({})
    if (data) {
        res.json({ title: 'All teacher', data: data })
    }
}

exports.show = async (req, res) => {
    let data = await Teacher.findById(req.params.id)
    if (data) {
        res.json({ title: 'Special teacher', data: data })
    }
}

exports.create = (req, res) => {
    let { firstName, lastName, email, subject, phone, password } = req.body;
    if (firstName && lastName && email && subject && phone && password) {
        let teacher = new Teacher({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            subject: req.body.subject,
            phone: req.body.phone,
            password: req.body.password
        })
        teacher.save()
            .then(data => {
                if (data) {
                    res.json({ title: 'Teacher created', data: data })
                }
            })
    }
    else {
        res.json({ title: 'Ma`lumot toliq emas' })
    }
}

exports.remove = async (req, res) => {
    let data = await Teacher.findByIdAndDelete(req.params.id)
    if (data) {
        res.json({ title: 'Teacher removed', data:data })
    }
}

exports.update = async (req, res) => {
    let { firstName, lastName, email, subject, phone, password } = req.body;
    if (firstName || lastName || email || subject || phone || password) {
        let data = await Teacher.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            res.json({ title: 'Teacher edited', data: data})
        }
    }
    else {
        res.json({ title: 'Ma`lumot yo`q' })
    }
}

// const { title } = require('process')
const Teacher = require('../models/Teacher')

exports.index = async (req, res) => {
    let { idTeacher } = req.query
    console.log(idTeacher)
    let data = await Teacher.findById(idTeacher, ['group'])
    if (data) {
        res.json({ title: 'Teacher`s all group', data: data })
    }
}

exports.show = async (req, res) => {
    const data = await Teacher.findById(req.query.idTeacher).select({ group: { $elemMatch: { _id: req.params.id } } })
    if (data) {
        res.json({ title: 'Special group', data: data })
    }
    else {
        res.json({ title: 'Xato' })
    }
}

exports.create = async (req, res) => {
    let { title, day, time } = req.body;
    let { idTeacher } = req.query;
    try {
        let idTeacherCheck = await Teacher.findById(idTeacher)
        if (title && day && time) {
            const data = await Teacher.findByIdAndUpdate(idTeacher, { $push: { group: req.body } })
            if (data) {
                res.json({ title: 'Group added to Teacher', data })
            } else {
                res.json({ title: 'Xatolik' })
            }
        } else {
            res.json({ title: 'Ma`lumot toliq emas' })
        }
    }
    catch (e) {
        res.json({ title: 'Error', e })
    }

}

exports.remove = async (req, res) => {
    if (req.query.idTeacher && req.query.IdGroup) {
        const data = await Teacher.findByIdAndUpdate(req.query.idTeacher, {
            $pull: { group: { _id: req.query.IdGroup } }
        })
        if (data) {
            res.json({ title: 'Group deleted', data })
        }
    } else {
        res.json({ title: "Error", desc: "Bunday oqituvchi mavjud emas" })
    }
}

exports.update = async (req, res) => {
    const { title, day, time } = req.body;
    if(req.query.idTeacher && req.query.IdGroup){
        if(title || day || time){
            const data = await Teacher.findOneAndUpdate(
                {
                    _id: req.query.idTeacher,
                    "group._id": req.query.IdGroup   
                }, 
                {
                $set: {
                    "group.$": { ...req.body, _id: req.query.IdGroup }
                }
            })
            if (data) {
                res.json({ title: 'Group updated', data })
            } else {
                res.json({ title: 'Xatolik' })
            }
        }
    }
}




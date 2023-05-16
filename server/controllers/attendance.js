// const { title } = require('process')
const Student = require('../models/Student')

exports.index = async (req, res) => {
    let { idStudent } = req.query
    console.log(idStudent)
    let data = await Student.findById(idStudent, ['attendance'])
    if (data) {
        res.json({ title: 'Student`s all attendance', data: data })
    }
}

exports.show = async (req, res) => {
    const data = await Student.findById(req.query.idStudent).select({ attendance: { $elemMatch: { _id: req.params.id } } })
    if (data) {
        res.json({ title: 'Special attendance', data: data })
    }
    else {
        res.json({ title: 'Xato' })
    }
}

exports.create = async (req, res) => {
    let { status, date, reason, score } = req.body;
    let { idStudent } = req.query;
    try {
        let idStudentCheck = await Student.findById(idStudent)
        if (status && date && reason && score) {
            const data = await Student.findByIdAndUpdate(idStudent, { $push: { attendance: req.body } })
            if (data) {
                res.json({ title: 'Attendance added to Student', data })
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
    if (req.query.idStudent && req.query.idAttendance) {
        const data = await Student.findByIdAndUpdate(req.query.idStudent, {
            $pull: { attendance: { _id: req.query.idAttendance } }
        })
        if (data) {
            res.json({ title: 'Attendance deleted', data })
        }
    } else {
        res.json({ title: "Error", desc: "Bunday talaba mavjud emas" })
    }
}

exports.update = async (req, res) => {
    const { status, date, reason, score } = req.body;
    if(req.query.idStudent && req.query.idAttendance){
        if(status || date || reason || score){
            const data = await Student.findOneAndUpdate(
                {
                    _id: req.query.idStudent,
                    "attendance._id": req.query.idAttendance   
                }, 
                {
                $set: {
                    "attendance.$": { ...req.body, _id: req.query.idAttendance }
                }
            })
            if (data) {
                res.json({ title: 'Attendance updated', data })
            } else {
                res.json({ title: 'Xatolik' })
            }
        }
    }
}




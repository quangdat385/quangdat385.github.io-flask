const Users=require('../modals/Users');

class UsersController {
    //GET http://localhost:5000/api/users/show
    show(req, res, next) {
        
        Users.find({})
            .then(users =>res.status(200).json({data:users}))
            .catch(next)
        
    }
    //GET http://localhost:5000/api/users/search?q=a&less=1
    search(req, res, next) {
        const rgx = (pattern) => new RegExp(`.*${pattern}.*`);

        
        Promise.all([Users.find({full_name:{ $regex: rgx(req.query.q) , $options: 'si' }}),
                    Users.find({nickname:{ $regex: rgx(req.query.q) , $options: 'si' }})])
            .then(([fullname, nickname]) => {
                console.log(nickname)
                const users=[...fullname,...nickname];
                
                
                const mySet=new Set(users.reduce((acc, user) => {
                    
                    
                    return [...acc,user._id]
                },[]))
                const result =[...mySet]


                Users.find({_id:{$in:result}}).limit(req.query.type==="less"?3:5)
                    .then(users =>res.send({data:users}))
                    .catch(err =>console.log(err))
            })
            .catch(next)
        
    }
    //PUT  http://localhost:5000/api/users/post
    post(req, res, next) {
        if (req.fileValidationError) {

            return res.send(req.fileValidationError);
        } else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        const file = req.file
        const FormValidator = {...req.body }
        FormValidator.avatar = `http://localhost:5000/img/${file.filename}`
        FormValidator.forChangeImg = `./src/public/img/${file.filename}`
        
        const users= new Users(FormValidator)
        users
            .save()
            .then(()=>res.status(200).json(users))
            .catch(next)
    }
    //PUT http://localhost:5000/api/users/id
    update(req, res, next) {
        Users.findOneAndUpdate({ _id: req.params.id }, req.body,{new:true})
            .then((user) => res.status(200).json(user))
            .catch(next)
    }
    //PUT http://localhost:5000/api/users/:id/img
    updateAvatar(req, res, next) {
        if (req.fileValidationError) {

            return res.send(req.fileValidationError);
        } else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        const file = req.file
        
        Users.findById({_id: req.params.id})
            .then(user => {
                const fs = require('fs')

                try {
                    fs.unlinkSync(user.forChangeImg)
                    //file removed
                    } catch(err) {
                    console.error(err)

                }
                user.avatar = `http://localhost:5000/img/${file.filename}`
                user.forChangeImg = `./src/public/img/${file.filename}`

                
                user
                    .save()
                    .then(()=>res.status(200).json(user))
                    .catch(next)
                    })
            .catch(next)
            
        
        
        
    }
    //DELETE http://localhost:5000/api/users/delete/:id
    delete(req, res, next) {

        Users.findById({_id: req.params.id})
        .then(user => {
            const fs = require('fs')

            try {
                fs.unlinkSync(user.forChangeImg)
                //file removed
                } catch(err) {
                console.error(err)



            }
        })    


        Users.deleteOne({ _id: req.params.id })


            .then(() => {
                Users.find({})
                    .then((users) =>res.status(200).json({data:users}))
                    .catch(next)
            })
            .catch(next)
    }
    


}


module.exports = new UsersController;
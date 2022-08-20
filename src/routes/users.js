const express = require('express')
const multer = require('multer')
const appRoot = require('app-root-path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/img');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + Date.now() + file.originalname);
    },
});
const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: imageFilter
});



const router=express.Router()

const UsersController =require('../app/controllers/UsersController')



router.get("/show",UsersController.show);
router.get("/search",UsersController.search);

router.post("/post",upload.single('avatar'),UsersController.post);
router.put("/:id",UsersController.update);
router.put("/:id/img",upload.single('avatarUpdate'),UsersController.updateAvatar);
router.delete("/delete/:id",UsersController.delete);





module.exports=router;
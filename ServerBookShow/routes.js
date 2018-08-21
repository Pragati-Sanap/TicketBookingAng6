var express=require('express');
var router=express.Router();

var users=require('./controllers/user.js');


router.get('/myapi/bookDetails/',users.getAll);
router.get('/myapi/user/:id',users.getOne);
router.post('/myapi/user/',users.create);
router.put('/myapi/user/:id',users.update);
router.delete('/myapi/user/:id',users.delete);
router.get('/myapi/getBookedSeats/',users.getBookedSeats);
router.get('/myapi/getDate/',users.getDate);


module.exports = router;
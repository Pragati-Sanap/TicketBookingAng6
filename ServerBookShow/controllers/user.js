var userModel = require('../models/user');

temp: Array;
var temp1 = [];
var tempd = [];

var date;
var dateString;

var updatetime;
var createdTime;
var utime;
var ctime;

var creation;


var UserData = {
    name: '',
    email: '',
    seats: [],
    price: 0,
    eventDate: new Date(),
    status: 'processing'
}
function dateformat(date) {
    date = new Date(date);

    var dd = date.getDate();
    var MM = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (MM < 10) {
        MM = '0' + MM;
    }
    var formatDate = yyyy + '-' + MM + '-' + dd;
    // console.log(formatDate);
    return formatDate;
}
var users = {
    getAll: function (req, res) {

        userModel.find(function (err, doc) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'success' + err, docs: doc });
            }
        });
    },
    getOne: function (req, res) {
        userModel.findById(req.params.id, function (err, doc) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' });
            }
            else {
                console.log(doc.createdAt);
                console.log(doc.createdAt === doc.updatedAt);
                res.status(200).json({ status: 'success', message: 'success', doc: doc });
            }
        });
  },
    getDate: function (req, res) {
        userModel.find(function (err, doc) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' });
            }
            else {
                date = new Date();
                console.log(date);
                var dd = date.getDate();
                var MM = date.getMonth() + 1; //January is 0!
                var yyyy = date.getFullYear();

                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (MM < 10) {
                    MM = '0' + MM;
                }

                // yyyy-MM-dd
                dateString = yyyy + '-' + MM + '-' + dd;

                res.status(200).json({ status: 'success', message: 'success' + err, docs: dateString });

            }
        })
    },
    getBookedSeats: function (req, res) {

        userModel.find(function (err, doc) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' });
            }
            else {
                console.log(doc);
                temp1 = [];
                var tempdata =
                {
                    tempd: [],
                    temp1: []
                }




                for (var j = 0; j < doc.length; j++) {
                    if (doc[j].status === 'completed' || doc[j].status == 'locked') {
                        var temp = doc[j];
                        var tempseat = temp.seats;
                        var tempd = temp.eventDate;
                        tempd = dateformat(tempd);
                        console.log(tempd);
                        console.log(tempseat);
                        tempdata.tempd.push(tempd);
                        tempdata.temp1.push(tempseat);
                        for (i = 0; i < tempseat.length; i++) {
                            temp1.push(tempseat[i]);
                        }
                    }
                }
                console.log(temp1);
                console.log(tempdata);

                res.status(200).json({ status: 'success', message: 'success' + err, seats: tempdata });

            }
        });
    },
    create: function (req, res) {

        var user = new userModel();
        user.name = req.body.name;
        user.email = req.body.email;
        user.seats = req.body.seats;
        user.price = req.body.price;
        user.eventDate = req.body.eventDate;
        user.status = 'locked';
        ctime = new Date();
        user.ctime = ctime.getTime();
        creation = user.ctime;
        console.log("creation time " + user.ctime);
        console.log('************')
           
        user.save(function (err, doc) {
                if (err) {
                    res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' });
                }
                else { 
                   setTimeout( function(){
                        userModel.findById(doc._id, function (err, doc) {
                            if (err)
                               console.log(err);
                            else if(doc.status=='locked'){
                             console.log(doc.status);
                             doc.status='failed';
                             doc.save(function (err) {
                                if(err)
                                console.log(err);
                            })
                         }
                    });
                   },10000,doc._id,res)

                     res.status(200).json({ status: 'success', message: 'Document Added Successfully', docs: doc });
              
                }
            });
    },
    update: function (req, res) {
        userModel.findById(req.params.id, function (err, doc) {
            if (err)
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' });

            doc.name = req.body.name;
            doc.email = req.body.email;
            doc.seats = req.body.seats;
            doc.price = req.body.price;
            doc.eventDate = req.body.eventDate;
            console.log(req.body.createdAt);
            doc.ctime = new Date().getTime();
            console.log(doc.ctime + "jhgjhbh");
            console.log(creation);
            console.log("vjgvkfvuk");
            console.log("time difference " + (doc.ctime - creation));
            if (doc.ctime - creation > 10000) {
                doc.status = 'failed'
            } else if (doc.ctime - creation < 10000) {
                doc.status = 'completed'
            }
            console.log(doc.status);
            doc.save(function (err) {

                console.log("time difference " + (doc.ctime - creation > 10000));

                console.log(doc.status);

                if (err) {
                    res.status(504).json({ status: 'error', message: 'timeout error' + err, docs: doc });
                }
                else if (err) {
                    res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' });
                }
                else {
                    res.status(200).json({ status: 'success', message: 'Document Updated Successfully', docs: doc });
                }
            });

        });

    },
    delete: function (req, res) {

        userModel.remove({
            _id: req.params.id
        }, function (err, user) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' })
            }
            else {
                res.status(200).json({ status: 'success', message: 'Document deleted Successfully', docs: '' });
            }
        });
    }



};

module.exports = users;
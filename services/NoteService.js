/**
 * @description Services for operaions on request by user as client
 * @author Yash
 * @since   26/11/2018
 * @version 1.1
 */

const utility = require('../utility/util');
const staticFile = require('../config/static');
const usermodel = require('../app/models/UserModel');
const noteModel = require('../app/models/NoteModel');
const async = require('async');

/**
 * @description notes save service
 */
exports.NoteAddService = function (req, callback) {
    console.log('req on service', req);

    let sender = req.sender;
    let resultFinal;
    async.waterfall([
        function (callback) {
            usermodel.FindOneModel(sender, (err, data) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, data._id);
                }
            })
        }
    ], function (err, result) {
        console.log('fine result - ', result);
        req.user_id = result;
        noteModel.noteSave(req, (err, data) => {
            if (err) {
                resultFinal = false;
            }
            else {
                resultFinal = true;
            }
        })
    }
    )

    if (resultFinal) {
        return callback(null, resultFinal);
    }
    else {
        return callback(null)
    }
}
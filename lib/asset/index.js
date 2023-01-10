'use strict'

const { assert } = require('joi');
const mongoose = require('mongoose')
    , async = require('async')
    , config = require('../../config/default.json')
    , moment = require('moment');

module.exports = {
    add: (args, callback) => {
        let assert_data = {};
        let addMovie = n => {
            let assertObj = {
                "Asset_id": args.Asset_id,
                "Device_name": args.Device_name,
                "Employee_name": args.Employee_name,
                "Manufacturer": args.Manufacturer,
                "Model": args.Model,
                "Serial_number": args.Serial_number,
                "Processor": args.Processor,
                "Speed": args.Speed,
                "Hdd": args.Hdd,
                "Ram": args.Ram
            }
            mongoose.models['Asset'](assertObj).save((err, res) => {
                if (!err && res) {
                    assert_data = res;
                    return n();
                } else {
                    callback({
                        status: 500,
                        message: err ? err.message : "Something went wrong"
                    })
                }
            })
        }

        async.series([
            addMovie,
        ], (err, result) => {
            if (err) {
                return callback({
                    status: 500,
                    message: err
                })
            } else {
                return callback({
                    status: 200,
                    message: "Added successfully.",
                    data: assert_data
                })
            }
        })
    },

    list: (args, callback) => {
        mongoose.models['Asset'].find({}, (err, docs) => {
            if (!err && docs) {
                return callback({
                    status: 200,
                    message: "success",
                    data: docs
                });
            } else if (!docs) { 
                return callback({
                    status: 200,
                    message: "empty list",
                    data: {}
                });
            } else {
                return callback({
                    status: 500,
                    message: err
                });
            }
        })
    },

    details: (args, callback) => {
        let project = {
            __v: 0,
            createdAt: 0,
            updatedAt: 0
        }
        mongoose.models['Asset'].findOne({ _id:  args._id}, project, (err, docs) => {
            if (!err && docs) {
                return callback({
                    status: 200,
                    message: "success",
                    data: docs
                });
            } else if (!docs) { 
                return callback({
                    status: 200,
                    message: "empty list",
                    data: {}
                });
            } else {
                return callback({
                    status: 500,
                    message: err
                });
            }
        }) 
    },

    edit: (args, callback) => {
        mongoose.models['Asset'].findOneAndUpdate({_id:  args._id}, { $set: args }, (err, docs) => {
            if (!err && docs) {
                return callback({
                    status: 200,
                    message: "updated Successfully."
                });
            } else {
                return callback({
                    status: 500,
                    message: err
                });
            }
        });
    }

}
'use strict'

const express = require('express')
    , router = express.Router()
    , asset = require('../../lib/asset')
    , joi = require ('../../lib/joi')

router.post('/add', (req, res) => {
    let validation = joi.addAssert(req.body);
    if (validation.error == null) {
        asset.add(req.body, result => {
            res.json(result);
        })
    } else {
        let obj = {
            status: 1001,
            message: 'Warning',
            desc: validation.error.details[0].message || validation.error,
        }
        res.send(obj);
    }
})

router.post('/list', (req, res) => {
    asset.list(req.body, result => {
        res.json(result);
    })
})

router.post('/details', (req, res) => {
    asset.details(req.body, result => {
        res.json(result);
    })
})

router.post('/edit', (req, res) => {
    asset.edit(req.body, result => {
        res.json(result);
    })
})

module.exports = router;
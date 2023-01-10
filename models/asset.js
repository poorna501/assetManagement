const { string } = require('joi');
const mongoose = require('mongoose')

var Schema = mongoose.Schema;
let schema = new Schema({
    Asset_id: {
        type: String,
        required: true
    },
    Device_name: {
        type: String,
        required: true
    },
    Employee_name: {
        type: String,
        required: true
    },
    Manufacturer: {
        type: Number,
        required: true
    },
    Model: {
        type: Number,
        required: true
    },
    Serial_number: {
        type: String,
        required: true
    },
    Processor: {
        type: String,
        required: true
    },
    Speed: {
        type: String,
        required: true
    },
    Hdd: {
        type: String,
        required: true
    },
    Ram: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        CreatedAt: true,
        UpdatedAt: true
    }
})

schema.statics = {
    list: (f, o, p) => {
        let agg = [
            {
                $match: f
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    genre: 1,
                    release_date: 1,
                    up_votes: 1,
                    down_votes: 1,
                    reviews: 1
                }
            },
            {$sort: {_id: -1}}
        ]

        //TO get recent 3 appointments only
        if (p && p.up_votes && p.up_votes == true) {
            agg.push(
                { $sort: { up_votes: -1 } },
            )
        }
        if (p && p.down_votes && p.down_votes == true) {
            agg.push(
                { $sort: { down_votes: -1 } },
            )
        }
        if (p && p.release_date && p.release_date == true) {
            agg.push(
                { $sort: { release_date: -1 } },
            )
        }
        agg.push({
            $facet: {
                metadata: [{
                    $count: "total"
                }],
                data: [{
                    $skip: o.skip
                }, {
                    $limit: o.limit
                }]
            }
        })
        return agg;
    },
}

module.exports = mongoose.model("Asset", schema, "Asset")
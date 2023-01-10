'use strict'
/**
 * @description for joi validation
 * @author poorna
 * @since Jan 09, 2023
 */

const Joi = require('joi');

module.exports = {
    addAssert: (body) => {
        let schema = Joi.object().keys({
            Asset_id: Joi.string(),
            Device_name: Joi.string(),
            Employee_name: Joi.string(),
            Manufacturer: Joi.string(),
            Model: Joi.string(),
            Serial_number: Joi.string(),
            Processor: Joi.string(),
            Speed: Joi.string(),
            Hdd: Joi.string(),
            Ram: Joi.string()
        })
       return schema.validate(body)
    }
}

const { Device, DeviceInfo, DeviceReviews} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');  //npm i uuid, this generates random id
const path = require('path');

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, isSale, priceSale, brandId, typeId, info } = req.body;
            const { img } = req.files; // install package express-fileupload and register it in index.js - (app.use(fileUpload({})))
            let fileName = uuid.v4() + ".jpg";

            img.mv(path.resolve(__dirname, '..' ,'static', fileName));

            const device = await Device.create({ name, price, isSale, priceSale, brandId, typeId, img: fileName });

            if (info) {
                info = JSON.parse(info);
                info.forEach((i) => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id,
                    })
                })
            }

            return res.json(device);

        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async edit(req, res, next) {
        try {
            let { name, price, brandId, typeId, info, id } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";

            img.mv(path.resolve(__dirname, '..' ,'static', fileName));

            if (info) {
                info = JSON.parse(info);
                info.forEach((i) => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id,
                    })
                })
            }

            const device = await Device.update({ name, price, brandId, typeId, img: fileName }, {where: {id: id}});
            return res.json(device);

        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async addReview(req, res, next) {
        try {
            let { rating, description, deviceId, userId } = req.body;

            const review = await DeviceReviews.create({ rating, description, deviceId, userId })

            return res.json(review);
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const device = await Device.destroy( { where: {id: id} });
            return res.json(device);

        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query;
        let devices;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset });
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
        }

        return res.json(devices);
    }

    async getSaleAll(req, res) {
        let { limit, page } = req.query;
        let devices;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let isSale = true;

        devices = await Device.findAndCountAll({ where: { isSale }, limit, offset });

        return res.json(devices);
    }

    async getOne(req, res) {
        const { id } = req.params; //the id we use in deviceRouter on get-request with /:id
        const device = await Device.findOne({
            where: { id },
            include: [
                { model: DeviceInfo, as: 'info' },
                { model: DeviceReviews, as: 'review' }
            ]
        });

        return res.json(device);
    }
}

module.exports = new DeviceController();
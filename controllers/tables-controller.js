const Tables = require('../models/tables-model');

exports.getTables = async (req, res) => {
    const tables = await Tables.find({});
    res.send(tables[0]);
}
const express = require('express');
const router = express.Router();
const telemoveisController = require("../controllers/telemovelController");

/*GET lista de telemoveis */
router.get('/telemoveis',telemoveisController.getTelemoveis);
//POST
router.post('/telemoveis',telemoveisController.createTelemovel);
//GET
router.get('/telemoveis/:_id',telemoveisController.getTelemovel);
//PUT
router.put('/telemoveis/:_id',telemoveisController.updateTelemovel);
//DELETE
router.delete('/telemoveis/:_id',telemoveisController.deleteTelemovel);
//PARAM
router.param('_id',telemoveisController.getTelemovelById);

module.exports = router;


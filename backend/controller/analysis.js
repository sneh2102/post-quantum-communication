const analysis = require('../models/analysis');
const signatureAnalysis = require('../models/signatureAnalysis');

async function getAnalysis(req, res) {
    try {
        const analysisData = await analysis.find();
        res.status(200).send(analysisData);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

async function getSignatureAnalysis(req, res) {
    try {
        const signatureAnalysisData = await signatureAnalysis.find();
        res.status(200).send(signatureAnalysisData);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

async function getParticularAnalysis(req, res) {
    console.log("getParticularAnalysis");
    console.log(req.params.algorithm);
    try {
        const analysisData = await analysis.find({algorithm: req.params.algorithm});
        res.status(200).send(analysisData);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

async function getParticularSignatureAnalysis(req, res) {
    console.log("getParticularSignatureAnalysis");
    try {
        const signatureAnalysisData = await signatureAnalysis.findById(req.params.algorithm);
        res.status(200).send(signatureAnalysisData);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

async function getAlgorithms(req, res) {
    console.log("getAlgorithms");
    try {
        const algorithms = await analysis.distinct('algorithm');
        res.status(200).send(algorithms);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

async function getSignatureAlgorithms(req, res) {
    try {
        const algorithms = await signatureAnalysis.distinct('algorithm');
        res.status(200).send(algorithms);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}



module.exports = {
    getAnalysis,
    getSignatureAnalysis,
    getParticularAnalysis,
    getParticularSignatureAnalysis,
    getAlgorithms,
    getSignatureAlgorithms
};
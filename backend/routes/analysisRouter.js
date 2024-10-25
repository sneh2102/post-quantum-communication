const {Router} = require('express');
const { getAlgorithms,
    getSignatureAlgorithms,
    getAnalysis,
    getSignatureAnalysis,
    getParticularAnalysis,
    getParticularSignatureAnalysis} = require('../controller/analysis');
const router = Router();

router.get('/', getAnalysis);
router.get('/signatureAnalysis', getSignatureAnalysis);
router.get('/analysis/:algorithm', getParticularAnalysis);
router.get('/signatureAnalysis/:algorithm',getParticularSignatureAnalysis);
router.get('/algorithms', getAlgorithms);
router.get('/signatureAlgorithms', getSignatureAlgorithms);

module.exports = router;
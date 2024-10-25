import { getApi } from "./index";

const BASE_URL = "http://localhost:8001/api/v1";
const analysis = async () => {
    return await getApi(`${BASE_URL}/analysis`);
    };

const signatureAnalysis = async () => {
    return await getApi("/v1/analysis/signatureAnalysis");
    }

const getAlgorithms = async () => {
    return await getApi(`${BASE_URL}/analysis/algorithms`);
    }

const getSignatureAlgorithms = async () => {
    return await getApi(`${BASE_URL}/analysis/signatureAlgorithms`);
    }

const getParticularAnalysis = async (algorithm) => {
    return await getApi(`${BASE_URL}/analysis/analysis/${algorithm}`);
    }

const getParticularSignatureAnalysis = async (algorithm) => {
    return await getApi(`${BASE_URL}/analysis/signatureAnalysis/${algorithm}`);
    }

export { analysis, signatureAnalysis, getAlgorithms, getSignatureAlgorithms, getParticularAnalysis, getParticularSignatureAnalysis };
import React from 'react'
import AlgorithmsAnalysis from '../../components/analysis/AlgorithmsAnalysis'
import SignatureAnalysis from '../../components/analysis/SignatureAnalysis'

const Analysis = () => {
    const [analysis, setAnalysis] = React.useState(false);

    const handleAnalysis = () => {
        setAnalysis(true);
    }
    const handleSignatureAnalysis = () => {
        setAnalysis(false);
    }
  return (
    <>
    <div className="flex w-full justify-center items-center bg-white text-black text-2xl font-bold">

        <div className="menu bg-slate-400 rounded-box w-56 ">
            <ul>
                <li onClick={handleAnalysis}>Analysis</li>
                <li onClick={handleSignatureAnalysis}>Signature Analysis</li>
            </ul>
        </div>
        <div className="main">
            <div className="container">
                {analysis ? <AlgorithmsAnalysis />: <SignatureAnalysis />}

            </div>
        </div>
    </div>
    </>
  )
}

export default Analysis


import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImageUploader } from './components/ImageUploader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Spinner } from './components/Spinner';
import { analyzeImage } from './services/geminiService';
import type { DiagnosisResult } from './types';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [results, setResults] = useState<DiagnosisResult[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setResults(null);
    setError(null);
  };

  const handleAnalyzeClick = useCallback(async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const diagnosisResults = await analyzeImage(imageFile);
      setResults(diagnosisResults);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);

  const handleReset = () => {
    setImageFile(null);
    setImageUrl(null);
    setResults(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-100 text-slate-800 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-10 border border-white/50 transition-all duration-500">
          
          {!imageUrl && (
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-700 mb-2">
                Upload Your X-Ray Image
              </h2>
              <p className="text-center text-slate-500 mb-8">
                Our AI will analyze the image and provide potential diagnostic insights.
              </p>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg relative my-4" role="alert">
              <p className="font-bold">An Error Occurred</p>
              <p>{error}</p>
            </div>
          )}

          {imageUrl && (
            <div className="w-full flex flex-col items-center animate-fade-in">
              <div className="w-full max-w-lg mb-6 relative">
                <img src={imageUrl} alt="Uploaded X-ray" className="rounded-lg shadow-2xl w-full h-auto object-contain border-4 border-white/50" />
              </div>
              
              {!isLoading && !results && (
                 <button
                    onClick={handleAnalyzeClick}
                    className="px-8 py-4 bg-sky-600 text-white font-bold rounded-lg shadow-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 transition-all transform hover:scale-105 active:scale-100 animate-pulse"
                    disabled={isLoading}
                  >
                    Analyze Image
                  </button>
              )}
            </div>
          )}

          {isLoading && <Spinner />}

          {results && (
            <div className="w-full mt-8 animate-fade-in">
               <ResultsDisplay results={results} />
               <div className="text-center mt-8">
                 <button
                    onClick={handleReset}
                    className="px-8 py-3 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
                  >
                    Analyze Another Image
                  </button>
               </div>
            </div>
          )}
        </div>
        <p className="text-center text-xs text-slate-500 mt-6 max-w-2xl">
            Disclaimer: This tool is a Proof of Concept and should not be used for actual medical diagnosis. Always consult with a qualified healthcare professional for any medical concerns.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default App;

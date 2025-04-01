import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStop, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute, FaTimes, FaClock } from 'react-icons/fa';

const CookingMode = ({ recipe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [steps, setSteps] = useState([]);

 
  useEffect(() => {
    if (recipe && recipe.instructions) {
     
      const parsed = recipe.instructions
        .split(/\n+/)
        .filter(step => step.trim().length > 0)
        .map(step => {
          
          return step.replace(/^\d+\.|\bStep\s+\d+:?\s*/i, '').trim();
        });
      setSteps(parsed);
    }
  }, [recipe]);

  
  useEffect(() => {
    let interval;
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning]);

 
  useEffect(() => {
    if (isOpen && isVoiceEnabled && currentStep < steps.length) {
      
      window.speechSynthesis.cancel();
      
     
      const utterance = new SpeechSynthesisUtterance(steps[currentStep]);
      utterance.rate = 0.9; 
      window.speechSynthesis.speak(utterance);
    }
    
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentStep, isOpen, isVoiceEnabled, steps]);


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

 
  const toggleVoice = () => {
    if (isVoiceEnabled) {
      window.speechSynthesis.cancel();
    }
    setIsVoiceEnabled(!isVoiceEnabled);
  };


  const startCookingMode = () => {
    setIsOpen(true);
    setCurrentStep(0);
    setTimer(0);
    setIsTimerRunning(true);
    
   
    document.documentElement.requestFullscreen?.();
    
   
    navigator.wakeLock?.request('screen').catch(err => {
      console.log('Wake Lock error:', err);
    });
  };

 
  const exitCookingMode = () => {
    window.speechSynthesis.cancel();
    setIsOpen(false);
    setIsTimerRunning(false);
    
   
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    
  
    navigator.wakeLock?.release?.();
  };

  if (!recipe || !recipe.instructions) {
    return null;
  }

  return (
    <div>
      <button
        onClick={startCookingMode}
        className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        <FaPlay />
        <span>Start Cooking Mode</span>
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="flex flex-col h-full">
            
            <div className="bg-primary text-white px-4 py-3 flex justify-between items-center">
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <FaClock />
                  <span>{formatTime(timer)}</span>
                </div>
                <button 
                  onClick={toggleVoice}
                  className="p-2 rounded-full hover:bg-primary-dark transition-colors"
                  aria-label={isVoiceEnabled ? "Mute voice instructions" : "Enable voice instructions"}
                >
                  {isVoiceEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
                </button>
                <button 
                  onClick={exitCookingMode}
                  className="p-2 rounded-full hover:bg-primary-dark transition-colors"
                  aria-label="Exit cooking mode"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            
           
            <div className="flex-1 overflow-y-auto p-6 flex flex-col">
              <div className="mb-4 text-center">
                <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="bg-gray-50 p-8 rounded-lg max-w-2xl w-full shadow-lg">
                  <p className="text-2xl text-center">{steps[currentStep]}</p>
                </div>
              </div>
              
              
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Ingredients needed:</h3>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            
            <div className="bg-gray-100 p-4 flex justify-center items-center gap-4">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`p-3 rounded-full ${
                  currentStep === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label="Previous step"
              >
                <FaStepBackward />
              </button>
              
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-4 bg-primary text-white rounded-full hover:bg-primary/90"
                aria-label={isTimerRunning ? "Pause timer" : "Resume timer"}
              >
                {isTimerRunning ? <FaPause /> : <FaPlay />}
              </button>
              
              <button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className={`p-3 rounded-full ${
                  currentStep === steps.length - 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label="Next step"
              >
                <FaStepForward />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookingMode;

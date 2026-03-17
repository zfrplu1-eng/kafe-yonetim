import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { regions } from '../../data/products';
import { VargelLogoPlaceholder, DegirmenLogoPlaceholder } from './LogoPlaceholder';

export function RegionSelection() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentRegion = regions.find(r => r.id === selectedRegion);

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId);
    setIsOpen(false);
    localStorage.setItem('selectedRegion', regionId);
    
    // 3 saniye sonra dashboard'a geç
    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {isTransitioning && (
          <>
            <motion.div
              className="absolute inset-0 flex z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="w-1/2 h-full flex items-center justify-center bg-white p-16"
                initial={{ x: 0 }}
                animate={{ x: '-100%' }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <VargelLogoPlaceholder />
              </motion.div>
              <motion.div 
                className="w-1/2 h-full flex items-center justify-center bg-white p-16"
                initial={{ x: 0 }}
                animate={{ x: '100%' }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <DegirmenLogoPlaceholder />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="w-full h-full flex">
        {/* Sol Taraf - Logo */}
        <motion.div 
          className="w-1/2 h-full flex items-center justify-center bg-white p-16"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRegion || 'default'}
              className="max-w-[70%] max-h-[70%] object-contain"
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
              transition={{ duration: 0.5 }}
            >
              {currentRegion?.logo === 'vargel' ? <VargelLogoPlaceholder /> : <DegirmenLogoPlaceholder />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Sağ Taraf - Bölge Seçimi */}
        <motion.div 
          className="w-1/2 h-full flex items-center justify-center bg-white"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-md w-full px-8">
            <motion.h2
              className="text-3xl font-bold text-gray-800 mb-8 text-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Bölge Seçimi
            </motion.h2>

            <motion.div
              className="relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white border-2 border-gray-300 rounded-xl px-6 py-4 flex items-center justify-between hover:border-amber-400 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <span className="text-lg font-medium text-gray-700">
                  {currentRegion ? currentRegion.name : 'Bir bölge seçin'}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="absolute top-full mt-2 w-full bg-white border-2 border-gray-200 rounded-xl shadow-2xl overflow-hidden z-10"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {regions.map((region, index) => (
                      <motion.button
                        key={region.id}
                        onClick={() => handleRegionSelect(region.id)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-gray-700 font-medium">
                          {region.name}
                        </span>
                        <div 
                          className={`w-4 h-4 rounded-full ${
                            region.logo === 'vargel' 
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                              : 'bg-gradient-to-r from-amber-500 to-orange-600'
                          }`}
                        />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {selectedRegion && !isTransitioning && (
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-amber-600 font-semibold">
                  Dashboard'a yönlendiriliyorsunuz...
                </p>
                <div className="flex justify-center gap-1 mt-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-amber-500 rounded-full"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
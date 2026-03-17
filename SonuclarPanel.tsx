import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { VargelLogoPlaceholder, DegirmenLogoPlaceholder } from './LogoPlaceholder';

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center overflow-hidden">
      {/* Sol Taraf - Vargel Kafe */}
      <motion.div 
        className="w-1/2 h-full flex items-center justify-center border-r-2 border-gray-200"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="w-[70%] h-[70%] flex items-center justify-center"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, 0, -2, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <VargelLogoPlaceholder />
        </motion.div>
      </motion.div>

      {/* Sağ Taraf - Değirmen Kafe */}
      <motion.div 
        className="w-1/2 h-full flex items-center justify-center"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="w-[70%] h-[70%] flex items-center justify-center"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, -2, 0, 2, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        >
          <DegirmenLogoPlaceholder />
        </motion.div>
      </motion.div>

      {/* Loading Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
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
    </div>
  );
}
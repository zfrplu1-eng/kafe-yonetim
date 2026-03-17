import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Lock, User } from 'lucide-react';
import { VargelLogoPlaceholder, DegirmenLogoPlaceholder } from './LogoPlaceholder';

export function LoginScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useState(() => {
    const timer = setTimeout(() => setShowLogin(true), 500);
    return () => clearTimeout(timer);
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Basit validasyon (gerçek sistemde backend ile kontrol edilecek)
    setTimeout(() => {
      if (username && password) {
        localStorage.setItem('currentUser', username);
        localStorage.setItem('userRole', username.toLowerCase() === 'admin' ? 'admin' : 'user');
        navigate('/region');
      }
      setIsLoggingIn(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center overflow-hidden">
      {/* Background - Blurred Logos */}
      <motion.div 
        className="absolute inset-0 flex"
        animate={{ 
          filter: showLogin ? 'blur(8px)' : 'blur(0px)',
          opacity: showLogin ? 0.3 : 1
        }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-1/2 h-full flex items-center justify-center border-r-2 border-gray-200 p-12">
          <VargelLogoPlaceholder />
        </div>
        <div className="w-1/2 h-full flex items-center justify-center p-12">
          <DegirmenLogoPlaceholder />
        </div>
      </motion.div>

      {/* Login Panel */}
      {showLogin && (
        <motion.div
          className="relative z-10 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 md:p-12 max-w-md w-full mx-4"
          initial={{ scale: 0, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.6
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Hoş Geldiniz
            </h1>
            <p className="text-lg font-semibold text-gray-700">
              Değirmen Kafe
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Personel Panel Girişidir
            </p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Kullanıcı Adı
              </Label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                  placeholder="Kullanıcı adınızı girin"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Şifre
              </Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                  placeholder="Şifrenizi girin"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                type="submit"
                disabled={isLoggingIn}
                className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoggingIn ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  'Giriş Yap'
                )}
              </Button>
            </motion.div>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-gray-400 text-center mt-6"
          >
            Şifrenizi unuttuysanız yöneticinizle iletişime geçin
          </motion.p>
        </motion.div>
      )}

      {isLoggingIn && (
        <motion.div
          className="absolute inset-0 bg-white z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </div>
  );
}
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { regions } from '../../data/products';
import { ClipboardList, FileText, ShoppingCart, BookOpen, Settings, LogOut } from 'lucide-react';
import { SayimPanel } from './panels/SayimPanel';
import { SonuclarPanel } from './panels/SonuclarPanel';
import { SiparisPanel } from './panels/SiparisPanel';
import { RecetePanel } from './panels/RecetePanel';
import { AdminPanel } from './panels/AdminPanel';
import { VargelLogoPlaceholder, DegirmenLogoPlaceholder } from './LogoPlaceholder';
import { useNavigate } from 'react-router';

type MenuItem = {
  id: string;
  name: string;
  icon: any;
  color: string;
  adminOnly?: boolean;
};

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState<string>('sayim');
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('user');
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const selectedRegionId = localStorage.getItem('selectedRegion') || 'degirmen';
  const currentUser = localStorage.getItem('currentUser') || 'Kullanıcı';
  const currentRegion = regions.find(r => r.id === selectedRegionId);
  const LogoComponent = currentRegion?.logo === 'vargel' ? VargelLogoPlaceholder : DegirmenLogoPlaceholder;
  const primaryColor = currentRegion?.logo === 'vargel' 
    ? 'from-blue-500 to-cyan-500' 
    : 'from-amber-500 to-orange-600';

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'user';
    setUserRole(role);
  }, []);

  const menuItems: MenuItem[] = [
    { id: 'sayim', name: 'Sayım', icon: ClipboardList, color: primaryColor },
    { id: 'sonuclar', name: 'Sayım Sonuçları', icon: FileText, color: primaryColor, adminOnly: true },
    { id: 'siparis', name: 'Sipariş Tedarik', icon: ShoppingCart, color: primaryColor },
    { id: 'recete', name: 'Reçeteler', icon: BookOpen, color: primaryColor },
  ];

  const visibleMenuItems = menuItems.filter(item => 
    !item.adminOnly || userRole === 'admin'
  );

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    localStorage.removeItem('selectedRegion');
    navigate('/');
  };

  const renderPanel = () => {
    if (showAdminPanel) return <AdminPanel onClose={() => setShowAdminPanel(false)} />;
    
    switch (selectedMenu) {
      case 'sayim':
        return <SayimPanel />;
      case 'sonuclar':
        return <SonuclarPanel />;
      case 'siparis':
        return <SiparisPanel />;
      case 'recete':
        return <RecetePanel />;
      default:
        return <SayimPanel />;
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex overflow-hidden">
      {/* Sol Sidebar - Logo ve Menüler */}
      <motion.div 
        className="w-80 bg-white shadow-2xl flex flex-col"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <motion.div
            className="w-full h-32"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <LogoComponent />
          </motion.div>
          <div className="mt-4 text-center">
            <p className="text-sm font-semibold text-gray-600">{currentRegion?.name}</p>
            <p className="text-xs text-gray-400 mt-1">{currentUser}</p>
          </div>
        </div>

        {/* Menü Items */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {visibleMenuItems.map((item, index) => {
            const Icon = item.icon;
            const isSelected = selectedMenu === item.id;
            const isHovered = hoveredMenu === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setSelectedMenu(item.id)}
                onMouseEnter={() => setHoveredMenu(item.id)}
                onMouseLeave={() => setHoveredMenu(null)}
                className={`w-full rounded-xl transition-all duration-300 ${
                  isSelected 
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4 p-4">
                  <Icon className="w-6 h-6" />
                  <span className="font-semibold text-lg">{item.name}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Alt Kısım - Admin ve Çıkış */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          {userRole === 'admin' && (
            <motion.button
              onClick={() => setShowAdminPanel(true)}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-xl p-4 flex items-center gap-4 transition-all shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Settings className="w-5 h-5" />
              <span className="font-semibold">Admin Ayarları</span>
            </motion.button>
          )}
          
          <motion.button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl p-4 flex items-center gap-4 transition-all shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Çıkış Yap</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Sağ Panel - İçerik */}
      <motion.div 
        className="flex-1 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMenu + (showAdminPanel ? '-admin' : '')}
            className="h-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPanel()}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Arka Plan Efektleri */}
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-amber-200/20 to-orange-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
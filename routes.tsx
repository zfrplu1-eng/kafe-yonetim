import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { productsByRegion, Product } from '../../../data/products';
import { Save, Edit, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

interface SayimEntry {
  id: string;
  date: string;
  category: string;
  product: string;
  productId: string;
  quantity: number;
  gramPerUnit: number;
  openingGram: number;
  totalGram: number;
  staff: string;
  editable: boolean;
}

export function SayimPanel() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [openingGram, setOpeningGram] = useState<string>('');
  const [sayimList, setSayimList] = useState<SayimEntry[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  const selectedRegionId = localStorage.getItem('selectedRegion') || 'degirmen';
  const currentUser = localStorage.getItem('currentUser') || 'Kullanıcı';
  const products = productsByRegion[selectedRegionId] || [];
  
  const categories = Array.from(new Set(products.map(p => p.category)));
  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : [];

  useEffect(() => {
    // Sayım kilidi kontrolü
    const lockDate = localStorage.getItem(`sayim_lock_${selectedRegionId}`);
    if (lockDate) {
      const lockTime = new Date(lockDate).getTime();
      const now = new Date().getTime();
      const weekInMs = 7 * 24 * 60 * 60 * 1000;
      
      if (now - lockTime < weekInMs && localStorage.getItem('userRole') !== 'admin') {
        setIsLocked(true);
        const remainingDays = Math.ceil((weekInMs - (now - lockTime)) / (24 * 60 * 60 * 1000));
        toast.error(`Sayım kilitli! ${remainingDays} gün sonra yeniden sayım yapabilirsiniz.`);
      }
    }

    // Önceki sayımları yükle
    const savedSayim = localStorage.getItem(`sayim_current_${selectedRegionId}`);
    if (savedSayim) {
      setSayimList(JSON.parse(savedSayim));
    }
  }, [selectedRegionId]);

  const handleSave = () => {
    if (!selectedCategory || !selectedProduct || !quantity) {
      toast.error('Lütfen tüm alanları doldurun!');
      return;
    }

    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const quantityNum = parseFloat(quantity) || 0;
    const openingGramNum = parseFloat(openingGram) || 0;
    const calculatedGram = quantityNum * product.gramPerUnit;
    const totalGram = calculatedGram + openingGramNum;

    const newEntry: SayimEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('tr-TR'),
      category: selectedCategory,
      product: product.name,
      productId: product.id,
      quantity: quantityNum,
      gramPerUnit: product.gramPerUnit,
      openingGram: openingGramNum,
      totalGram,
      staff: currentUser,
      editable: true,
    };

    const updatedList = [...sayimList, newEntry];
    setSayimList(updatedList);
    localStorage.setItem(`sayim_current_${selectedRegionId}`, JSON.stringify(updatedList));

    // Formu temizle
    setQuantity('');
    setOpeningGram('');
    toast.success('Sayım kaydedildi!');
  };

  const handleEdit = (id: string) => {
    const entry = sayimList.find(e => e.id === id);
    if (!entry || !entry.editable) {
      toast.error('Bu kayıt düzenlenemez!');
      return;
    }

    setSelectedCategory(entry.category);
    setSelectedProduct(entry.productId);
    setQuantity(entry.quantity.toString());
    setOpeningGram(entry.openingGram.toString());

    // Kaydı listeden kaldır ve düzenlenemez yap
    const updatedList = sayimList.map(e => 
      e.id === id ? { ...e, editable: false } : e
    );
    setSayimList(updatedList);
    localStorage.setItem(`sayim_current_${selectedRegionId}`, JSON.stringify(updatedList));
  };

  const handleFinish = () => {
    if (sayimList.length === 0) {
      toast.error('Henüz sayım yapılmamış!');
      return;
    }

    // Sayımı arşive taşı
    const archive = JSON.parse(localStorage.getItem('sayim_archive') || '[]');
    archive.push({
      region: selectedRegionId,
      date: new Date().toISOString(),
      staff: currentUser,
      entries: sayimList,
    });
    localStorage.setItem('sayim_archive', JSON.stringify(archive));

    // Kilitle
    localStorage.setItem(`sayim_lock_${selectedRegionId}`, new Date().toISOString());
    
    // Mevcut sayımı temizle
    localStorage.removeItem(`sayim_current_${selectedRegionId}`);
    
    toast.success('Sayım tamamlandı! Panel 1 hafta kilitlendi.');
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (isLocked) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sayım Kilitli</h2>
          <p className="text-gray-600">
            Bu bölge için sayım tamamlanmış ve 1 hafta boyunca yeni sayım yapılamaz.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-8 overflow-hidden">
      <motion.div
        className="bg-white rounded-2xl shadow-xl flex-1 flex overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* Sol: Form */}
        <div className="w-2/5 p-8 border-r border-gray-200 overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sayım Paneli</h2>
          
          <div className="space-y-6">
            <div>
              <Label className="text-gray-700 font-medium">Kategori</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="mt-2 h-12">
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Ürün</Label>
              <Select 
                value={selectedProduct} 
                onValueChange={setSelectedProduct}
                disabled={!selectedCategory}
              >
                <SelectTrigger className="mt-2 h-12">
                  <SelectValue placeholder="Ürün seçin" />
                </SelectTrigger>
                <SelectContent>
                  {filteredProducts.map(prod => (
                    <SelectItem key={prod.id} value={prod.id}>
                      {prod.name} ({prod.gramPerUnit}g)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Adet</Label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-2 h-12"
                placeholder="Kalan adet"
                min="0"
                step="1"
              />
              {selectedProduct && quantity && (
                <p className="text-sm text-gray-500 mt-1">
                  = {(parseFloat(quantity) * (products.find(p => p.id === selectedProduct)?.gramPerUnit || 0)).toLocaleString()} gram
                </p>
              )}
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Açılışta Kalan (gram)</Label>
              <Input
                type="number"
                value={openingGram}
                onChange={(e) => setOpeningGram(e.target.value)}
                className="mt-2 h-12"
                placeholder="Açılışta kalan gram"
                min="0"
              />
            </div>

            {selectedProduct && quantity && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl">
                <p className="text-sm font-medium text-gray-700">Toplam Gram</p>
                <p className="text-3xl font-bold text-amber-600">
                  {((parseFloat(quantity) || 0) * (products.find(p => p.id === selectedProduct)?.gramPerUnit || 0) + (parseFloat(openingGram) || 0)).toLocaleString()} g
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                <Save className="w-5 h-5 mr-2" />
                Kaydet
              </Button>
            </div>
          </div>
        </div>

        {/* Sağ: Tablo */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Sayımı Yapılan Ürünler</h3>
            <Button
              onClick={handleFinish}
              variant="destructive"
              className="bg-red-500 hover:bg-red-600"
            >
              Sayımı Bitir
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                  <th className="p-3 text-left text-sm font-semibold">Tarih</th>
                  <th className="p-3 text-left text-sm font-semibold">Kategori</th>
                  <th className="p-3 text-left text-sm font-semibold">Ürün</th>
                  <th className="p-3 text-left text-sm font-semibold">Adet</th>
                  <th className="p-3 text-left text-sm font-semibold">Gram</th>
                  <th className="p-3 text-left text-sm font-semibold">Toplam</th>
                  <th className="p-3 text-left text-sm font-semibold">Personel</th>
                  <th className="p-3 text-left text-sm font-semibold">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {sayimList.map((entry, index) => (
                  <motion.tr
                    key={entry.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="p-3 text-sm">{entry.date}</td>
                    <td className="p-3 text-sm">{entry.category}</td>
                    <td className="p-3 text-sm font-medium">{entry.product}</td>
                    <td className="p-3 text-sm">{entry.quantity}</td>
                    <td className="p-3 text-sm">{entry.gramPerUnit}g</td>
                    <td className="p-3 text-sm font-semibold text-amber-600">
                      {entry.totalGram.toLocaleString()}g
                    </td>
                    <td className="p-3 text-sm">{entry.staff}</td>
                    <td className="p-3">
                      {entry.editable ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(entry.id)}
                          className="text-xs"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      ) : (
                        <span className="text-xs text-gray-400">Düzenlendi</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {sayimList.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                Henüz sayım yapılmamış
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

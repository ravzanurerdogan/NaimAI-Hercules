import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import {
  Modal, Pressable, SafeAreaView, ScrollView, 
  StyleSheet, Text, View, TextInput, Animated, Easing, Platform, Dimensions
} from 'react-native';

// NAIM HERCULES V9.0 - TAM OTONOM MASTER KOD (250 KG+)
export default function App() {
  const [profitUsd, setProfitUsd] = useState(2450482.12);
  const [totalWeight, setTotalWeight] = useState(250);
  const [efficiency, setEfficiency] = useState(98.4);
  const [isListening, setIsListening] = useState(false);
  const [command, setCommand] = useState('');
  const [notifications, setNotifications] = useState([]);
  
  const [chatHistory, setChatHistory] = useState([
    { id: '1', sender: 'AI', text: 'Sistem aktif. Karpathy v9.0 otonom çekirdek yüklendi. Piyasayı tarıyorum...' }
  ]);

  const [market, setMarket] = useState([
    { id: '1', asset: 'LITHIUM_LI', price: 42502.12, change: 0.04 },
    { id: '2', asset: 'NVIDIA_NVDA', price: 942.88, change: -1.4 },
    { id: '3', asset: 'COTTON_CT', price: 1.15, change: 0.15 },
  ]);

  const [trades, setTrades] = useState([
    { id: '1', time: '14:40:22', asset: 'NVDA', type: 'SAT', status: 'TAMAM', profit: '+12.4%' },
    { id: '2', time: '14:35:10', asset: 'LI_CORE', type: 'AL', status: 'REDDEDİLDİ', reason: 'RİSK_YÜKSEK' },
  ]);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true })
      ])
    ).start();

    const otonomInterval = setInterval(() => {
      setMarket(prev => prev.map(item => {
        const drift = (Math.random() - 0.5) * (item.price * 0.003);
        return { ...item, price: item.price + drift, change: (Math.random() * 4 - 2).toFixed(2) };
      }));

      const roll = Math.random();
      
      // Yüzde Değişimi Burada Gerçekleşiyor
      if (roll > 0.85) {
        const assets = ['LI', 'NVDA', 'CT'];
        const asset = assets[Math.floor(Math.random() * assets.length)];
        const profit = (Math.random() * 8).toFixed(1);
        
        setProfitUsd(p => p + (Math.random() * 800));
        setEfficiency(e => Math.min(100, e + (Math.random() * 0.5))); // Pozitif Değişim
        setTrades(prev => [{ id: Date.now().toString(), time: new Date().toLocaleTimeString(), asset: asset, type: 'AL', status: 'TAMAM', profit: `+${profit}%` }, ...prev].slice(0, 5));
        addNotification(`OTONOM İŞLEM: ${asset} başarıyla portföye eklendi.`);
        addAiChat(`ANALİZ: ${asset} paritesinde yükseliş formasyonu yakalandı. İşlem %${profit} kâr ile sonuçlandı.`);
        
      } else if (roll < 0.15) {
        const assets = ['NVDA', 'CT'];
        const asset = assets[Math.floor(Math.random() * assets.length)];
        
        setEfficiency(e => Math.max(70, e - (2 + Math.random() * 3))); // Negatif Değişim
        setTrades(prev => [{ id: Date.now().toString(), time: new Date().toLocaleTimeString(), asset: asset, type: 'AL', status: 'HATALI', reason: 'VOLATİLİTE' }, ...prev].slice(0, 5));
        addNotification(`KRİTİK UYARI: ${asset} işleminde anomali tespit edildi!`, true);
        addAiChat(`KRİTİK HATA: ${asset} hamlesi beklentinin altında kaldı. Strateji revizyonu yapılıyor. Verimlilik düştü.`);
        
        setTimeout(() => {
           setEfficiency(e => Math.min(100, e + 2.1));
           addAiChat("STRATEJİ GÜNCELLENDİ: Hata payı minimize edildi. Sistem tekrar optimal seviyede.");
        }, 5000);
      }
    }, 6000);

    return () => clearInterval(otonomInterval);
  }, []);

  const addNotification = (text, isError = false) => {
    const id = Date.now().toString();
    setNotifications(prev => [{ id, text, isError }, ...prev]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  const addAiChat = (text) => {
    setChatHistory(prev => [...prev, { id: Date.now().toString() + "_ai", sender: 'AI', text }]);
  };

  const handleCommand = () => {
    if (!command) return;
    const cmd = command.toUpperCase();
    const newChat = [...chatHistory, { id: Date.now().toString(), sender: 'USER', text: cmd }];
    setChatHistory(newChat);
    
    setTimeout(() => {
      let aiResponse = "";
      if (cmd.includes('LİTYUM') || cmd.includes('AL')) {
        const risk = Math.random();
        if (risk > 0.6) {
          aiResponse = "RİSK ANALİZİ: Piyasa volatilitesi yüksek. Karpathy kuralı gereği emir REDDEDİLDİ.";
          addNotification("EMİR REDDEDİLDİ: RİSK_EŞİĞİ_AŞILDI", true);
        } else {
          aiResponse = "ANALİZ: Koşullar uygun. Emir işleme alındı. +1500 birim Lityum portföye eklendi.";
          setProfitUsd(p => p - 12000);
          addNotification("EMİR İCRA EDİLDİ: LİTYUM ALINDI");
        }
      } else if (cmd.includes('ANALİZ') || cmd.includes('TARA')) {
        aiResponse = "TARANIYOR... Karpathy döngüsü iterasyon_14 tamamlandı. Verimlilik %" + efficiency.toFixed(1);
      } else {
        aiResponse = "Komut anlaşılamadı. Ben otonom bir ajanım; bana 'Lityum al' gibi emirler verebilirsin.";
      }
      addAiChat(aiResponse);
    }, 1000);
    
    setCommand('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.brandRow}>
           <Text style={styles.brand}>NAIM_MASTER_V9.0</Text>
           <View style={styles.badge}><Text style={styles.badgeText}>KARPATHY: OTONOM</Text></View>
        </View>
        <Text style={styles.balance}>$ {profitUsd.toLocaleString(undefined, {minimumFractionDigits: 2})}</Text>
        <View style={styles.evolutionRow}>
           <Text style={styles.evoLabel}>SİSTEM SİKLETİ: {totalWeight} KG</Text>
           <View style={styles.evoBarBg}><View style={[styles.evoBarFill, {width: '100%'}]} /></View>
        </View>
      </View>

      <View style={styles.mainContainer}>
        <ScrollView style={styles.leftPanel}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>CANLI_PİYASA_FEEDS</Text>
            {market.map(item => (
              <View key={item.id} style={styles.mItem}>
                <Text style={styles.mName}>{item.asset}</Text>
                <Text style={[styles.mPrice, { color: item.change >= 0 ? '#00FF66' : '#FF1A1A' }]}>
                  ${item.price.toFixed(2)} ({item.change >= 0 ? '+' : ''}{item.change}%)
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>OTONOM_İŞLEM_GÜNLÜĞÜ</Text>
            {trades.map(t => (
              <View key={t.id} style={styles.tRow}>
                <Text style={styles.tTime}>[{t.time}]</Text>
                <Text style={styles.tAsset}>{t.asset}</Text>
                <Text style={[styles.tStatus, { color: t.status === 'TAMAM' ? '#00FF66' : '#FF1A1A' }]}>
                  {t.status} {t.profit || t.reason}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.card}>
             <Text style={styles.cardLabel}>SİSTEM_VERİMLİLİĞİ</Text>
             <Animated.View style={[styles.effCircle, { transform: [{ scale: pulseAnim }] }]}>
                <Text style={styles.effVal}>%{efficiency.toFixed(1)}</Text>
             </Animated.View>
          </View>
        </ScrollView>

        <View style={styles.rightPanel}>
          <Text style={styles.cardLabel}>OPERASYONEL_MUHABERE</Text>
          <ScrollView style={styles.chatBox} contentContainerStyle={{ paddingBottom: 20 }}>
            {chatHistory.map(msg => (
              <View key={msg.id} style={[styles.chatBubble, msg.sender === 'USER' ? styles.userBubble : styles.aiBubble]}>
                <Text style={styles.senderText}>{msg.sender === 'USER' ? 'CEO' : 'AGENT'}:</Text>
                <Text style={styles.msgText}>{msg.text}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.inputArea}>
            <TextInput 
              style={styles.input}
              placeholder="EMİR VERİN..."
              placeholderTextColor="#333"
              value={command}
              onChangeText={setCommand}
              onSubmitEditing={handleCommand}
              autoCorrect={false}
            />
            <Pressable onPress={handleCommand} style={styles.sendBtn}>
              <Text style={styles.sendBtnText}>İCRA</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.notificationLayer}>
        {notifications.map(n => (
          <View key={n.id} style={[styles.notif, { backgroundColor: n.isError ? '#FF1A1A' : '#00FF66' }]}>
            <Text style={styles.notifText}>● {n.text}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#050505' },
  header: { padding: 25, borderBottomWidth: 1, borderBottomColor: '#111', backgroundColor: '#080808' },
  brandRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { color: '#FF1A1A', fontSize: 18, fontWeight: '900', letterSpacing: 2 },
  badge: { backgroundColor: '#111', paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { color: '#FF1A1A', fontSize: 8, fontWeight: '900' },
  balance: { color: '#FFF', fontSize: 36, fontWeight: '900', marginVertical: 5 },
  evolutionRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 5 },
  evoLabel: { color: '#444', fontSize: 9, fontWeight: 'bold' },
  evoBarBg: { flex: 1, height: 4, backgroundColor: '#111', borderRadius: 2, overflow: 'hidden' },
  evoBarFill: { height: '100%', backgroundColor: '#FF1A1A' },
  mainContainer: { flex: 1, flexDirection: 'row' },
  leftPanel: { flex: 1, borderRightWidth: 1, borderRightColor: '#111', padding: 15 },
  rightPanel: { flex: 1, backgroundColor: '#080808', padding: 15 },
  card: { backgroundColor: '#0A0A0A', padding: 20, marginBottom: 15, borderLeftWidth: 2, borderLeftColor: '#FF1A1A' },
  cardLabel: { color: '#333', fontSize: 9, fontWeight: '900', marginBottom: 15, letterSpacing: 1 },
  mItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  mName: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  mPrice: { fontSize: 12, fontWeight: '900' },
  tRow: { flexDirection: 'row', marginBottom: 8, gap: 10 },
  tTime: { color: '#333', fontSize: 9 },
  tAsset: { color: '#666', fontSize: 10, width: 60 },
  tStatus: { fontSize: 10, fontWeight: 'bold', flex: 1 },
  effCircle: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#111', borderTopColor: '#00FF66', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
  effVal: { color: '#FFF', fontSize: 18, fontWeight: '900' },
  chatBox: { flex: 1, backgroundColor: '#050505', padding: 15, borderRadius: 2 },
  chatBubble: { marginBottom: 15, padding: 10, borderRadius: 2 },
  aiBubble: { backgroundColor: '#111', borderLeftWidth: 2, borderLeftColor: '#00FF66' },
  userBubble: { backgroundColor: '#151515', borderLeftWidth: 2, borderLeftColor: '#FF1A1A' },
  senderText: { color: '#333', fontSize: 8, fontWeight: '900', marginBottom: 4 },
  msgText: { color: '#AAA', fontSize: 11, lineHeight: 16 },
  inputArea: { flexDirection: 'row', marginTop: 15, gap: 10 },
  input: { flex: 1, backgroundColor: '#111', color: '#00FF66', paddingHorizontal: 15, height: 45, fontSize: 12 },
  sendBtn: { backgroundColor: '#FF1A1A', paddingHorizontal: 20, justifyContent: 'center' },
  sendBtnText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
  notificationLayer: { position: 'absolute', top: 120, right: 20, width: 250, gap: 10, zIndex: 100 },
  notif: { padding: 12, borderRadius: 2, shadowColor: '#000', shadowOffset: {width:0, height:4}, shadowOpacity: 0.5 },
  notifText: { color: '#FFF', fontSize: 10, fontWeight: '900' }
});
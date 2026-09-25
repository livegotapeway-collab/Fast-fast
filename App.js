import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

const missions = [
  { id: 1, title: "Partager Fast Fast", reward: 100 },
  { id: 2, title: "Inviter un ami", reward: 250 },
  { id: 3, title: "Découvrir une mission", reward: 150 }
];

export default function App() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [balance, setBalance] = useState(0);
  const [done, setDone] = useState([]);

  const start = () => {
    if (!name.trim()) return Alert.alert("Nom requis", "Entre ton prénom pour commencer.");
    setStarted(true);
  };

  const doMission = (m) => {
    if (done.includes(m.id)) return;
    setDone([...done, m.id]);
    setBalance(balance + m.reward);
  };

  if (!started) return (
    <SafeAreaView style={styles.welcome}>
      <StatusBar style="light" />
      <Text style={styles.logo}>FAST FAST</Text>
      <Text style={styles.big}>Gagne des points.</Text>
      <Text style={styles.sub}>Une application simple pour découvrir des missions et accumuler des récompenses.</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Ton prénom" placeholderTextColor="#94a3b8" style={styles.input} />
      <Pressable style={styles.primary} onPress={start}><Text style={styles.primaryText}>Commencer</Text></Pressable>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.top}>
          <View><Text style={styles.hello}>Bonjour, {name} 👋</Text><Text style={styles.muted}>Voici tes missions.</Text></View>
          <Text style={styles.logoDark}>FAST</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.muted}>Mon solde</Text>
          <Text style={styles.balance}>{balance.toLocaleString()} pts</Text>
          <Pressable style={styles.withdraw} onPress={() => Alert.alert("Retrait", balance >= 500 ? "Demande enregistrée. Airtel Money sera connecté dans une prochaine version." : "Atteins 500 points pour demander un retrait.")}>
            <Text style={styles.withdrawText}>Demander un retrait</Text>
          </Pressable>
        </View>
        <Text style={styles.section}>Missions disponibles</Text>
        {missions.map(m => {
          const doneNow = done.includes(m.id);
          return <View style={styles.mission} key={m.id}>
            <View style={{flex:1}}><Text style={styles.title}>{m.title}</Text><Text style={styles.reward}>+{m.reward} pts</Text></View>
            <Pressable style={[styles.button, doneNow && styles.done]} onPress={() => doMission(m)}>
              <Text style={styles.buttonText}>{doneNow ? "Fait ✓" : "Faire"}</Text>
            </Pressable>
          </View>
        })}
        <Text style={styles.note}>Version 1 • Les points sont temporaires pour le moment.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 safe:{flex:1,backgroundColor:"#f5f7fb"},content:{padding:18,paddingBottom:35},
 welcome:{flex:1,backgroundColor:"#111827",padding:24,justifyContent:"center"},
 logo:{fontSize:32,fontWeight:"900",color:"#fff",letterSpacing:1},big:{fontSize:28,fontWeight:"800",color:"#fff",marginTop:35},sub:{color:"#cbd5e1",fontSize:16,lineHeight:23,marginTop:10,marginBottom:25},
 input:{backgroundColor:"#fff",borderRadius:14,padding:16,fontSize:16,marginBottom:12},primary:{backgroundColor:"#2563eb",padding:16,borderRadius:14,alignItems:"center"},primaryText:{color:"#fff",fontWeight:"800",fontSize:16},
 top:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:18},hello:{fontSize:22,fontWeight:"800",color:"#111827"},logoDark:{fontSize:20,fontWeight:"900",color:"#2563eb"},muted:{color:"#64748b",marginTop:3},
 card:{backgroundColor:"#111827",borderRadius:20,padding:20,marginBottom:24},balance:{color:"#fff",fontSize:36,fontWeight:"900",marginTop:6},withdraw:{marginTop:16,backgroundColor:"#fff",padding:13,borderRadius:12,alignItems:"center"},withdrawText:{color:"#111827",fontWeight:"800"},
 section:{fontSize:20,fontWeight:"800",marginBottom:12,color:"#111827"},mission:{backgroundColor:"#fff",borderRadius:16,padding:16,marginBottom:10,flexDirection:"row",alignItems:"center"},title:{fontSize:16,fontWeight:"700",color:"#111827"},reward:{color:"#16a34a",fontWeight:"800",marginTop:5},button:{backgroundColor:"#2563eb",paddingVertical:11,paddingHorizontal:18,borderRadius:10},done:{backgroundColor:"#94a3b8"},buttonText:{color:"#fff",fontWeight:"800"},note:{textAlign:"center",color:"#94a3b8",fontSize:12,marginTop:18}
});
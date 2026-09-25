import React, { useState } from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

const initialTasks = [
  { id: 1, title: "Partager une publication", reward: 100 },
  { id: 2, title: "Inviter un ami", reward: 250 },
  { id: 3, title: "Découvrir Fast Fast", reward: 50 }
];

export default function App() {
  const [balance, setBalance] = useState(0);
  const [done, setDone] = useState([]);

  const completeTask = (task) => {
    if (done.includes(task.id)) return;
    setDone([...done, task.id]);
    setBalance(balance + task.reward);
  };

  const withdraw = () => {
    Alert.alert(
      "Retrait",
      balance >= 1000
        ? "Le retrait Airtel Money sera connecté dans la prochaine version."
        : "Il faut atteindre 1 000 points pour demander un retrait."
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.logo}>FAST FAST</Text>
        <Text style={styles.subtitle}>Gagnez des points simplement</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Mon solde</Text>
        <Text style={styles.balance}>{balance.toLocaleString()} pts</Text>
        <Pressable style={styles.withdraw} onPress={withdraw}>
          <Text style={styles.withdrawText}>Retirer</Text>
        </Pressable>
      </View>

      <Text style={styles.section}>Missions</Text>
      {initialTasks.map((task) => {
        const completed = done.includes(task.id);
        return (
          <View key={task.id} style={styles.task}>
            <View style={{ flex: 1 }}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.reward}>+{task.reward} pts</Text>
            </View>
            <Pressable
              style={[styles.button, completed && styles.completed]}
              onPress={() => completeTask(task)}
            >
              <Text style={styles.buttonText}>{completed ? "Fait" : "Faire"}</Text>
            </Pressable>
          </View>
        );
      })}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1 • Simple • Rapide</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f5f7fb", padding: 18 },
  header: { backgroundColor: "#111827", borderRadius: 20, padding: 22, marginBottom: 16 },
  logo: { color: "#fff", fontSize: 28, fontWeight: "800" },
  subtitle: { color: "#cbd5e1", marginTop: 6, fontSize: 15 },
  card: { backgroundColor: "#fff", borderRadius: 18, padding: 20, marginBottom: 22 },
  label: { color: "#64748b", fontSize: 14 },
  balance: { fontSize: 32, fontWeight: "800", marginTop: 5, color: "#111827" },
  withdraw: { marginTop: 15, backgroundColor: "#111827", borderRadius: 12, padding: 13, alignItems: "center" },
  withdrawText: { color: "#fff", fontWeight: "700" },
  section: { fontSize: 20, fontWeight: "800", marginBottom: 10, color: "#111827" },
  task: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 10, flexDirection: "row", alignItems: "center" },
  taskTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  reward: { marginTop: 5, color: "#16a34a", fontWeight: "700" },
  button: { backgroundColor: "#2563eb", paddingVertical: 11, paddingHorizontal: 18, borderRadius: 10 },
  completed: { backgroundColor: "#94a3b8" },
  buttonText: { color: "#fff", fontWeight: "700" },
  footer: { alignItems: "center", marginTop: 18 },
  footerText: { color: "#94a3b8", fontSize: 12 }
});

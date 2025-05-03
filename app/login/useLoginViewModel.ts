import { useState, useEffect, useCallback } from "react";
import { Keyboard } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export function useLoginViewModel() {
  const { user, login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user) router.replace("/(tabs)");
  }, [user]);

  const validateForm = useCallback(() => {
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Email i hasło są wymagane");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Nieprawidłowy format e-mail");
      return false;
    }
    if (password.length < 6) {
      setErrorMsg("Hasło musi mieć co najmniej 6 znaków");
      return false;
    }
    return true;
  }, [email, password]);

  const handleSubmit = useCallback(async () => {
    Keyboard.dismiss();
    setErrorMsg("");
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (isLogin) await login(email, password);
      else await register(email, password);
    } catch (err: any) {
      switch (err.code) {
        case "auth/invalid-email":
          setErrorMsg("Nieprawidłowy e-mail");
          break;
        case "auth/email-already-in-use":
          setErrorMsg("E-mail już w użyciu");
          break;
        case "auth/wrong-password":
        case "auth/user-not-found":
          setErrorMsg("Nieprawidłowy e-mail lub hasło");
          break;
        default:
          setErrorMsg(err.message || "Coś poszło nie tak");
      }
    } finally {
      setLoading(false);
    }
  }, [email, password, isLogin, login, register, validateForm]);

  const toggleMode = useCallback(() => {
    setIsLogin((prev) => !prev);
    setErrorMsg("");
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLogin,
    loading,
    errorMsg,
    handleSubmit,
    toggleMode,
  };
}

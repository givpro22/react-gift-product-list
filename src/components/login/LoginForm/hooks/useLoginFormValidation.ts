import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useLoginFormValidation() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFormValid = isEmailValid && isPasswordValid;

  const handleLogin = async () => {
    const from = location.state?.from || "/";
    try {
      setError(null);
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      const message = "로그인에 실패했습니다.";
      setError(message);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isFormValid,
    setIsEmailValid,
    setIsPasswordValid,
    error,
    setError,
    handleLogin,
  };
}

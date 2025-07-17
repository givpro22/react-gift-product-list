import { FiChevronLeft, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { headerWrapper, titleStyle, backButtonStyle } from "./styles";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("Header user:", user);
  const handleClickBackButton = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <header css={headerWrapper()}>
      <button onClick={handleClickBackButton} css={backButtonStyle}>
        <FiChevronLeft size={24} />
      </button>
      <h1 css={titleStyle()}>선물하기</h1>
      <button onClick={() => navigate(user ? "/my" : "/login")}>
        <FiUser size={24} />
      </button>
    </header>
  );
}

import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";
function ToggleDarkMode() {
  const { isDarkMode, handleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={handleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default ToggleDarkMode;

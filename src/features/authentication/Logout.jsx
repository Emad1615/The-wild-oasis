import ButtonIcon from "./../../ui/ButtonIcon";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
import SpinnerMini from "./../../ui/SpinnerMini";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon onClick={() => logout()} disabled={isLoading}>
      {isLoading ? <SpinnerMini /> : <HiOutlineArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;

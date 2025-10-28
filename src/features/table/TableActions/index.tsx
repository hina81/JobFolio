import { NewApplicationButton } from "../../../components/Base/NewApplicationButton";
import style from "./style.module.css";

export const TableActions = () => {
  return (
    <div className={style.actions}>
      <NewApplicationButton />
    </div>
  );
};

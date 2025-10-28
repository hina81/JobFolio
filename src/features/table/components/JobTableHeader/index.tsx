import { Th } from "smarthr-ui";
import style from "../JobTable/style.module.css";

export const JobTableHeader = () => {
  return (
    <thead>
      <tr className={style.headerRow}>
        <Th className={style.companyCell}>会社名</Th>
        <Th className={style.statusCell}>ステータス</Th>
        <Th className={style.deadlineCell}>日程・締切</Th>
        <Th className={style.sourceCell}>応募経路</Th>
        <Th className={style.salaryCell}>給与</Th>
      </tr>
    </thead>
  );
};

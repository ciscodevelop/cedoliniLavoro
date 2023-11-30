import { PaySlip } from "@/model/paySlip.model";
import "./row.scss";
import InputRow from "./inputRow/InputRow";

function Row(props: PaySlip) {
  const { day, dayWeek } = props;
  //Filtro per escudere i campi che non devono essere visualizzati nella tabella
  const fieldsOutOfRender = [
    "id",
    "day",
    "dayWeek",
    "dayNumber",
    "dayInNumber",
  ];
  return (
    <>
      <tr>
        <td>{day}</td>
        <td>{dayWeek}</td>
        {Object.keys(props).map((field) => {
          if (!fieldsOutOfRender.includes(field)) {
            return (
              <td key={field}>
                <InputRow
                  name={field}
                  value={props[field]}
                  paySlip={props}
                  field={field}
                />
              </td>
            );
          }
        })}
      </tr>
    </>
  );
}

export default Row;

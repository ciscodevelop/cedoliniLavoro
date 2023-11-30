import "./selectMont.scss";

function SelectMont({
  monthPaySlip,
  handlerChangeMonth,
}: {
  monthPaySlip: any;
  handlerChangeMonth: any;
}) {
  const monthName = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ];
  return (
    <select
      name="selectMonth"
      id="select-month"
      value={monthPaySlip}
      onChange={handlerChangeMonth}
    >
      {monthName.map((name, index) => (
        <option key={index} value={index}>
          {name}
        </option>
      ))}
    </select>
  );
}

export default SelectMont;

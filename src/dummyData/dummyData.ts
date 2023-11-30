export function createDummyData( ) {
  const dayOfWeek = [
    "Domenica",
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
  ];
  const locale = "it";
  const actualYear = new Date().getFullYear();
  const intl = new Intl.DateTimeFormat(locale, { month: "long" });
  let countDayIndex = 0;
  const months = Array.from({ length: 12 }, (_, monthIndex) => {
    const firstDay = new Date(actualYear, monthIndex, 1);
    const lastDay = new Date(actualYear, monthIndex + 1, 0);
    const totalDaysOfMonth = lastDay.getDate();
    const startsOn = firstDay.getDay();

    const cedolino = Array.from({ length: totalDaysOfMonth }, (_, dayIndex) => {
      dayIndex + 1;
      countDayIndex > 6 ? (countDayIndex = 0) : countDayIndex;
      const returnData = {
        id: crypto.randomUUID(),
        day: (dayIndex + 1).toString(),
        dayWeek: dayOfWeek[countDayIndex],
        hours: "0",
        onlyTurn: "",
        extraHours: "0",
        cafeteriaBenefit: false,
        ticketRestaurant: false,
        hoursAbsance: "0",
        typeOfAbsance: "",
        dayNumber: countDayIndex,
        dayInNumber:countDayIndex
      };
      countDayIndex++;

      return returnData;
    });
    const monthName = intl.format(new Date(actualYear, monthIndex));

    return {
      monthName,
      totalDaysOfMonth,
      startsOn,
      cedolino,
      year: actualYear,
      startDayMonthName: dayOfWeek[startsOn],
    };
  });
  return months
}

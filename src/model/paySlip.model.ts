export  interface PaySlip{
    id: `${string}-${string}-${string}-${string}-${string}`
    day:string;
    dayWeek:string;
    hours:string;
    onlyTurn?:string|null;
    extraHours:string;
    cafeteriaBenefit:boolean;
    ticketRestaurant:boolean;
    hoursAbsance:string;
    typeOfAbsance:string;
    dayNumber?:number;
    dayInNumber?:number;
    [key: string]: any;
}
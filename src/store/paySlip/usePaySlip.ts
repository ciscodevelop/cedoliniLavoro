import { create } from "zustand";
import { PaySlip } from "@/model/paySlip.model";
import { createDummyData } from "@/dummyData/dummyData";

interface Store {
  paySlips: PaySlip[];
  add?: (paySlip: PaySlip) => void;
  edit: (idPaySlip: any, field: string, value: any) => void;
  autoCompailed: () => void;
  resetPaySlip: () => void;
  setMonth: (month: number) => void;
  getHours: () => number;
}
//giorni partono da domenica '0' sabato '6'
const holyDay = [0, 6];

console.log("dumm", createDummyData()[0].cedolino);
const paySlipDummy = createDummyData()[new Date().getMonth()].cedolino;

export const useStore = create<Store>()((set, get) => ({
  paySlips: paySlipDummy,
  getHours: () =>
    get().paySlips.reduce((acc, current) => {
      const result = acc + +current.hours;
      return result;
    }, 0 as number),

  edit: (id, field, value) => {
    console.log("Editing:", id, field, value);
    set((state) => ({
      paySlips: state.paySlips?.map((p: PaySlip) => {
        return p.id === id ? { ...p, [field]: value } : p;
      }),
    }));
  },
  autoCompailed: () => {
    set((state) => ({
      paySlips: state.paySlips?.map((p: PaySlip) => {
        if (!holyDay.includes(p.dayInNumber || 0)) {
          return { ...p, hours: "8", ticketRestaurant: true };
        }
        return p;
      }),
    }));
  },
  resetPaySlip: () => {
    set({ paySlips: paySlipDummy });
  },
  setMonth: (month) => {
    const paySlipDummy = createDummyData()[month].cedolino;
    set({ paySlips: paySlipDummy });
  },
}));

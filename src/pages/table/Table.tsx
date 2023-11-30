import { useRef, useState } from 'react';
import { useStore } from '@/store/paySlip/usePaySlip';
import { useTitlePage } from '@/hooks/useTitlePage';
import { PaySlip } from '@/model/paySlip.model';
import { generatePDF } from '@/createPDF/generatePDF';
import { ToastContainer, toast } from 'react-toastify';
import Row from './row/Row';
import FormUser from './formUser/FormUser';
import SelectMont from './selectMonth/SelectMont';
import useConfetti from '@/hooks/useConfetti';
import 'react-toastify/dist/ReactToastify.css';
import './table.scss';

function Table() {
  useTitlePage('Table');
  const [monthPaySlip, setMonthPaySlip] = useState(new Date().getMonth());
  const { paySlips, getHours, autoCompailed, resetPaySlip, setMonth } = useStore();
  const { ConfettiCustom, toggleConfetti } = useConfetti();
  const datiUser = useRef<any>();

  const setDatiUser = (datiUserProps: any) => {
    datiUser.current = datiUserProps;
  };

  const checkFielEmpty = () => {
    const filterEmpty = Object.values(datiUser.current).filter((value: any) => value !== '');

    return filterEmpty.length === Object.keys(datiUser.current).length;
  };

  const handlerGeneratePDF = () => {
    if (checkFielEmpty()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toggleConfetti();
      generatePDF({ data: paySlips, month: monthPaySlip+1, datiUser, active: true });
    } else {
      toast.warn('Compilare prima tutti i Campi');
    }
  };

  function handlerChangeMonth(event: React.ChangeEvent<HTMLSelectElement>): void {
    setMonthPaySlip(+event.target.value);
    setMonth(+event.target.value);
  }

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={4996}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <FormUser onDataUser={setDatiUser} />
      <ConfettiCustom />

      <div className='Container-main-table'>
        <div className='controls-table'>
          <label>
            <strong>Seleziona Mese Cedolino</strong>
          </label>
          <SelectMont monthPaySlip={monthPaySlip} handlerChangeMonth={handlerChangeMonth} />
          <div className='container-button-top'>
            <button onClick={autoCompailed}>Compilazione Automatica Cedolino</button>
            <button onClick={resetPaySlip}>Resetta Cedolino</button>
            <button onClick={handlerGeneratePDF}>Genera Cedolino PDF</button>
          </div>
        </div>
        <div className='contianer-table'>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>GIORNO SETTIMANA </th>
                <th>
                  ORE ORDINARIE
                  {getHours() && <span className='badge hours'>{getHours()}</span>}
                </th>
                <th>SOLO PER I TURNISTI (*)</th>
                <th>STRAORDINARIO</th>
                <th>TRATT. MENSA (SI/NO)</th>
                <th>BUONO PASTO (SI/NO)</th>
                <th>ASSENZA (ORE)</th>
                <th>TIPO DI ASSENZA</th>
                {/* <th>Azioni</th> */}
              </tr>
            </thead>
            <tbody>
              {paySlips?.map((p: PaySlip) => (
                <Row key={p.id} {...p} />
              ))}
            </tbody>
          </table>
        </div>
        <button className='btn-pdf' type='button' id='btn-pdf' onClick={handlerGeneratePDF}>
          Genera Cedolino PDF
        </button>
      </div>
    </>
  );
}

export default Table;

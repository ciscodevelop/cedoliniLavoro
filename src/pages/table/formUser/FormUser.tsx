import { useEffect, useState } from 'react';
import './formUser.scss';
interface FieldProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  [key: string]: string;
}

// interface UserProps {
//   fullName: FieldProps;
//   filiale: FieldProps;
//   ragioneSociale: FieldProps;
//   ccnlRiferimento: FieldProps;
//   [key: string]: FieldProps | string;
// }
interface ExtractedObject {
  [key: string | number]: string | number;
}
const initialUser: FieldProps[] = [
  { label: 'Nome Cognome', name: 'fullName', value: '', placeholder:'Mario Rossi' },
  { label: 'Filiale', name: 'filiale', value: '', placeholder:'TECU0405' },
  { label: 'Ragione Sociale', name: 'ragioneSociale', value: '', placeholder:'ACCENTURE SPA' },
  { label: 'CCNL di Riferimento', name: 'ccnlRiferimento', value: '', placeholder:'000135' },
];

function FormUser({ onDataUser }: { onDataUser: (obj: ExtractedObject) => void }) {
  const [user, setUser] = useState<FieldProps[]>(initialUser);

  function handlerChangeInput(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name: field, value } = event.target;

    setUser((prev) => prev.map((userData) => (userData.name === field ? { ...userData, value } : userData)));
  }
  useEffect(() => {
    const extractedObject: ExtractedObject = user.reduce((result, item) => {
      result[item.name] = item.value;
      return result;
    }, {} as ExtractedObject);

    onDataUser(extractedObject);
  }, [user, onDataUser]);

  return (
    <form className='container-form'>
      {user?.map((field, index) => (
        <div className='container-input-user' key={field.name}>
          <label htmlFor={field.label}>{field.label}</label>
          <input
            type='text'
            placeholder={field.placeholder}
            value={user[index].value || ''}
            onChange={handlerChangeInput}
            name={field.name}
            required
          />
        </div>
      ))}
    </form>
  );
}
export default FormUser;

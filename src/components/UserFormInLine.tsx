import { MdEdit } from 'react-icons/md';

import { useTranslation } from 'react-i18next';
import add_user_main from '../assets/icons/add_user_main.svg';

export default function UserFormInline({
  name, birthDate, age,
}: { name: string, birthDate: string, age: string }) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-12">
      <div className="form-group-inline col-span-5 items-center justify-center">

        <img src={add_user_main} className="mb-3" alt="add_user_main" />

        <p className="font-bold mb-1 mr-2 text-13 flex">
          <MdEdit className="text-xl text-gray-400" />
          {' '}
          {t('forms.name')}
        </p>
        <input
          type="text"
          className="rounded w-full"
          value={name}
          disabled
        />
      </div>
      <div className="form-group-inline col-span-4 items-center justify-center">
        <p className="font-bold mb-1 mr-2 text-13 w-full">
          <MdEdit className="text-xl text-gray-400" />
          {' '}
          {t('forms.birthDate')}
        </p>
        <input
          type="text"
          className="rounded w-40"
          value={birthDate}
          disabled
        />
      </div>
      <div className="form-group-inline col-span-2 items-center justify-center">
        <p className="font-bold mb-1 mr-2 text-13">
          <MdEdit className="text-xl text-gray-400" />
          {' '}
          Edad
        </p>
        <input
          type="text"
          className="rounded w-10"
          value={age}
          disabled
        />
      </div>
    </div>
  );
}

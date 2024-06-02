import React, {ChangeEvent, FC} from 'react';

type Props = {
   checkedValue: boolean
   onChangeChecked: (checked: boolean) => void
}

export const CheckBox: FC<Props> = (props) => {
   const {checkedValue, onChangeChecked} = props;

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeChecked(e.currentTarget.checked);
   }

   return (
      <input type="checkbox" checked={checkedValue} onChange={onChangeHandler}/>
   );
};

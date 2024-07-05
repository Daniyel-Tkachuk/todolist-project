import React, {ChangeEvent, FC} from 'react';

type Props = {
   isDone: boolean
   onChangeChecked: (checked: boolean) => void
}

export const CheckBox: FC<Props> = (props) => {
   const {isDone, onChangeChecked} = props;

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeChecked(e.currentTarget.checked);
   }

   return (
      <input type="checkbox" checked={isDone} onChange={onChangeHandler}/>
   );
};

import React, {FC} from 'react';

type Props = {
   textBtn: string
   onClick: () => void
}

export const Button: FC<Props> = (props) => {
   const {textBtn, onClick} = props;

   const onClickHandler = () => {
      onClick();
   }

   return (
      <button onClick={onClickHandler}>{textBtn}</button>
   );
};

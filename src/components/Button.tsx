import React, {FC} from 'react';

type Props = {
   textBtn: string
   className?: string
   onClick: () => void
}

export const Button: FC<Props> = (props) => {
   const {textBtn, className, onClick} = props;

   const onClickHandler = () => {
      onClick();
   }

   return (
      <button className={className} onClick={onClickHandler}>{textBtn}</button>
   );
};

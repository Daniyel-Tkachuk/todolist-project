import React, {FC, memo} from 'react';

type Props = {
   textBtn: string
   className?: string
   onClick: () => void
}

export const Button: FC<Props> = memo((props) => {
   const {textBtn, className, onClick} = props;
   console.log("Button")

   const onClickHandler = () => {
      onClick();
   }

   return (
      <button className={className} onClick={onClickHandler}>{textBtn}</button>
   );
});

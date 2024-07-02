import React, {FC, memo} from 'react';

type Props = {
   name: string
   className?: string
   onClick: () => void
}

export const Button: FC<Props> = memo((props) => {
   const {name, className, onClick} = props;
   console.log("Button")

   const onClickHandler = () => {
      onClick();
   }

   const styles = `button ${className}`

   return (
      <button className={styles} onClick={onClickHandler}>{name}</button>
   );
});

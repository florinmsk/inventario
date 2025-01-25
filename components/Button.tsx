import React, { JSX } from 'react';
import { cva } from 'class-variance-authority';

const classes = cva('border h-10 rounded-full px-6 font-medium flex justify-center items-center', {
    variants: {
        variant: {
            primary: 'btn-gradient text-white border-pink-600',
            secondary: 'border-pwhite text-white bg-transparent',
        },
    },
});

export default function Button(props: { variant: 'primary' | 'secondary' } & React.HTMLAttributes<HTMLButtonElement>): JSX.Element {
    const { variant, className, ...otherProps } = props;
    return <button className={classes({ variant, className })} {...otherProps} />;
}

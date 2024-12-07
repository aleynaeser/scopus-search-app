import { Fragment } from 'react';
import { SCIconSet } from './sm-icon-set';
import { IconBaseProps } from 'react-icons/lib';
import classNames from 'classnames';

export type TSCIconType = keyof typeof SCIconSet;

export interface ISCIcon extends Omit<IconBaseProps, 'className'> {
  icon: TSCIconType;
  color?: string;
  className?: string;
}

export default function SCIcon({ icon, color, className, ...props }: ISCIcon) {
  const SCIcon = SCIconSet[icon];

  return SCIcon ? (
    <SCIcon
      className={classNames('sc-svg', className)}
      size={props.size ?? 18}
      color={color && `var(--theme-color-${color})`}
      strokeWidth={props.strokeWidth ?? 1.5}
      {...props}
    />
  ) : (
    <Fragment></Fragment>
  );
}

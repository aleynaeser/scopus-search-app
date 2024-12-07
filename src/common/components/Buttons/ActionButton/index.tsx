import { motion } from 'framer-motion';
import { HTMLMotionProps } from 'framer-motion';
import SCIcon, { TSCIconType } from '@components/SCIcon';

import classNames from 'classnames';

import './action-button.scss';

type TActionButtonVariant = 'delete' | 'edit' | 'navigate';

interface IActionButton extends HTMLMotionProps<'button'> {
  className?: string;
  icon?: TSCIconType;
  variant?: TActionButtonVariant;
}

export default function ActionButton({ className, icon, variant = 'delete', ...buttonProps }: IActionButton) {
  const buttonType = buttonProps.type || 'button';

  const iconMap: Record<TActionButtonVariant, TSCIconType> = {
    delete: 'sc-delete',
    edit: 'sc-edit',
    navigate: 'sc-navigate',
  };
  const iconType = icon ?? iconMap[variant];

  return (
    <motion.button
      {...buttonProps}
      type={buttonType}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 130, damping: 10 }}
      tabIndex={-1}
      className={classNames('action-button', {
        [className!]: className,
        [variant]: variant,
      })}
    >
      <SCIcon icon={iconType} size='16' />
    </motion.button>
  );
}

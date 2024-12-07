import classNames from 'classnames';
import './sc-title.scss';

interface ISCTitle {
  title: string;
  innerText?: string;
  size?: 'sm' | 'lg';
}

export default function SCTitle({ title, innerText, size = 'lg' }: ISCTitle) {
  const words = title.split(' ');
  const boldText = words[0];
  const lightText = words.slice(1).join(' ');

  return (
    <h3 className={classNames('sc-title', { [size]: size })}>
      <strong>{boldText}</strong>
      {innerText && <span> {innerText}</span>}
      <span> {lightText}</span>
    </h3>
  );
}

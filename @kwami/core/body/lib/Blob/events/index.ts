import onClick from './onClick';
import onDoubleClick from './onDoubleClick';
import onHover from './onHover';
import onPress from './onPress';

type EventHandlers = {
  onClick: () => void;
  onDoubleClick: () => void;
  onHover: () => void;
  onPress: () => void;
  [key: string]: (() => void) | undefined;
};

const events: EventHandlers = {
  onClick,
  onDoubleClick,
  onHover,
  onPress
};

export default events;

import './reset.css';
import './index.css';

import logger from '@components/LogMessage';

setTimeout(() => {
  logger.show('Poletelo vse k chertyam', 'error', 5000);
  logger.show('Vam novoe soobshenie', 'info', 2000);
  logger.show('Opati prod upal', 'error', 1000);
  logger.show('Ostorojno', 'warning', 5000);
  logger.show('Eto ya pisal', 'info', 5000);
  logger.show('Test error', 'error', 4000);
  logger.show('Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ', 'warning', 3000);
  logger.show('Ha-ha-ha', 'info', 7000);

  setTimeout(() => {
    logger.show('Ha-ha-ha', 'info', 7000);
  }, 6000);
}, 2000)

import * as migration_20250104_191955 from './20250104_191955';
import * as migration_20250105_013015 from './20250105_013015';
import * as migration_20250108_064202 from './20250108_064202';
import * as migration_20250114_013821 from './20250114_013821';
import * as migration_20250114_191015 from './20250114_191015';

export const migrations = [
  {
    up: migration_20250104_191955.up,
    down: migration_20250104_191955.down,
    name: '20250104_191955',
  },
  {
    up: migration_20250105_013015.up,
    down: migration_20250105_013015.down,
    name: '20250105_013015',
  },
  {
    up: migration_20250108_064202.up,
    down: migration_20250108_064202.down,
    name: '20250108_064202',
  },
  {
    up: migration_20250114_013821.up,
    down: migration_20250114_013821.down,
    name: '20250114_013821',
  },
  {
    up: migration_20250114_191015.up,
    down: migration_20250114_191015.down,
    name: '20250114_191015'
  },
];

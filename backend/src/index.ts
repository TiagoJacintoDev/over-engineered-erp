import cors from 'cors';
import express from 'express';

import { v1Router } from './shared/infra/api/v1';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', v1Router);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

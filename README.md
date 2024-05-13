## Nest app

### To run app

Install dependencies

```bash
npm install
```

Copy env file

```bash
cp .env.example .env
```

Run docker compose db service and db migrations

```bash
docker compose up -d

npm run typeorm:migration

npm run db:seed
```

Start the app

```bash
npm run start:dev
```

# Фейерверки на Грибоедова — современный редизайн

Современная версия сайта [salut62.ru](https://salut62.ru) с анимацией салюта на фоне.

## Локальный запуск

```bash
npm install
npm run dev
```

## Деплой на GitHub Pages

1. Авторизуйтесь в GitHub CLI (один раз):
   ```bash
   gh auth login
   ```

2. Создайте репозиторий и запушьте:
   ```bash
   gh repo create salut --public --source=. --remote=origin --push
   ```

3. Включите GitHub Pages:
   - Откройте **Settings → Pages**
   - Source: **GitHub Actions**

4. После пуша в `main` сайт появится по адресу:
   ```
   https://<ваш-username>.github.io/salut/
   ```

Или запустите готовый скрипт: `./deploy.sh`

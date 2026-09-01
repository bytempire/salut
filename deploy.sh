#!/bin/bash
set -e

if ! gh auth status &>/dev/null; then
  echo "Сначала авторизуйтесь: gh auth login"
  exit 1
fi

if git remote get-url origin &>/dev/null; then
  echo "Пушим изменения..."
  git push origin main
else
  echo "Создаём репозиторий salut на GitHub..."
  gh repo create salut --public --source=. --remote=origin --push
fi

echo ""
echo "Готово! Включите GitHub Pages:"
echo "  Settings → Pages → Source: GitHub Actions"
echo ""
echo "Сайт будет доступен по адресу:"
echo "  https://$(gh api user -q .login).github.io/salut/"

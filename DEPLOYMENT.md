# Nasazení na Railway

## 🚀 Jak nasadit web na Railway

### 1. Příprava
- Mít účet na [Railway.app](https://railway.app)
- Mít projekt v Git repozitáři (GitHub, GitLab, atd.)

### 2. Nasazení na Railway

#### Krok 1: Přihlášení
1. Jděte na [Railway.app](https://railway.app)
2. Přihlaste se pomocí GitHub/GitLab
3. Klikněte na "New Project"

#### Krok 2: Propojení s Git
1. Vyberte "Deploy from GitHub repo"
2. Vyberte váš repozitář s projektem
3. Railway automaticky detekuje Python projekt

#### Krok 3: Konfigurace
1. Railway automaticky nainstaluje závislosti z `requirements.txt`
2. Spustí server pomocí `Procfile`
3. Poskytne URL adresu (např. `https://penzion-u-kostela.up.railway.app`)

### 3. Konfigurace proměnných (volitelné)

V Railway dashboardu můžete nastavit environment variables:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=penzion2024
```

### 4. Testování

Po nasazení otestujte:
- ✅ Hlavní stránka: `https://vase-url.railway.app`
- ✅ Admin panel: `https://vase-url.railway.app/admin-login.html`
- ✅ API endpoint: `https://vase-url.railway.app/api/prices`

### 5. Aktualizace

Při každém push do Git repozitáře se Railway automaticky přenasazuje.

## 💰 Ceny Railway

**Free tier:**
- 500 hodin/měsíc
- 512 MB RAM
- 1 GB storage
- Pro penzion dostačující!

**Paid tier:**
- $5/měsíc za další hodiny
- Více RAM a storage

## 🔧 Troubleshooting

### Problém: Server se nespustí
- Zkontrolujte `requirements.txt`
- Zkontrolujte `Procfile`
- Podívejte se na Railway logs

### Problém: API nefunguje
- Zkontrolujte URL v JavaScriptu
- Zkontrolujte CORS nastavení

### Problém: Ceny se neukládají
- Zkontrolujte práva k souboru `pricing.json`
- Podívejte se na Railway logs

## 📞 Podpora

- Railway dokumentace: https://docs.railway.app
- Railway Discord: https://discord.gg/railway

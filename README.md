# Penzion u kostela - Systém správy cen

Tento projekt obsahuje webové stránky penzionu s možností správy cen pro majitele.

## Funkce

### Pro návštěvníky
- Informace o penzionu a pokojích
- Aktuální ceník
- Kontaktní informace
- Vícejazyčnost (ČJ/EN)

### Pro majitele
- Přihlášení do administrace
- Úprava cen pokojů
- Trvalé ukládání cen do souboru
- Okamžité zobrazení změn na webu

## Jak používat systém správy cen

### 1. Přihlášení
- Klikněte na odkaz "Správa" v navigaci (je skrytý, ale dostupný)
- Použijte přihlašovací údaje:
  - **Uživatelské jméno:** `admin`
  - **Heslo:** `penzion2024`

### 2. Úprava cen
- Po přihlášení se zobrazí formulář s aktuálními cenami
- Upravte ceny podle potřeby
- Klikněte na "Uložit ceny"
- Změny se okamžitě projeví na všech stránkách

### 3. Typy cen
- **1 osoba - 1 noc:** Cena pro jednoho hosta na jednu noc
- **1 osoba - 2+ nocí:** Cena pro jednoho hosta při delším pobytu
- **Dvoulůžkový pokoj - 1 noc:** Cena pro dvoulůžkový pokoj na jednu noc
- **Dvoulůžkový pokoj - 2+ nocí:** Cena pro dvoulůžkový pokoj při delším pobytu
- **Třílůžkový pokoj - 1 noc:** Cena pro třílůžkový pokoj na jednu noc
- **Třílůžkový pokoj - 2+ nocí:** Cena pro třílůžkový pokoj při delším pobytu

## Spuštění serveru

### Lokální spuštění

#### 1. Instalace závislostí
```bash
pip3 install -r requirements.txt
```

#### 2. Spuštění serveru
```bash
python3 server.py
```

#### 3. Přístup k aplikaci
- **Hlavní stránka:** http://localhost:8080
- **Admin panel:** http://localhost:8080/admin-login.html
- **API endpoint:** http://localhost:8080/api/prices

### Nasazení na Railway

Pro produkční nasazení doporučujeme Railway. Podrobné instrukce najdete v [DEPLOYMENT.md](DEPLOYMENT.md).

**Rychlý postup:**
1. Nahrajte kód na GitHub
2. Jděte na [Railway.app](https://railway.app)
3. Propojte s GitHub repozitářem
4. Railway automaticky nasadí aplikaci
5. Získáte URL adresu (např. `https://penzion-u-kostela.up.railway.app`)

## Technické informace

### Soubory systému
- `server.py` - Flask backend server
- `pricing.json` - Soubor s uloženými cenami (vytvoří se automaticky)
- `admin-login.html` - Přihlašovací stránka
- `admin-panel.html` - Administrační panel
- `assets/js/pricing.js` - JavaScript pro správu cen

### Bezpečnost
- Systém používá Flask backend pro ukládání cen
- Ceny se ukládají do JSON souboru na serveru
- Přihlašovací údaje jsou hardcoded (v produkci by měly být bezpečnější)
- Doporučujeme změnit výchozí heslo

### Kompatibilita
- Funguje ve všech moderních prohlížečích
- Ceny se ukládají trvale na server
- Fallback na localStorage při výpadku serveru
- Změny jsou okamžité a viditelné na všech otevřených stránkách

## Struktura projektu

```
Míra_penzion/
├── index.html              # Hlavní stránka
├── about.html              # O penzionu
├── rooms.html              # Pokoje a ceny
├── contact.html            # Kontakt
├── admin-login.html        # Přihlášení pro správu
├── admin-panel.html        # Administrační panel
├── assets/
│   ├── css/
│   │   └── styles.css      # Styly
│   ├── js/
│   │   ├── main.js         # Hlavní JavaScript
│   │   ├── i18n.js         # Vícejazyčnost
│   │   └── pricing.js      # Správa cen
│   ├── i18n/               # Jazykové soubory
│   └── images/             # Obrázky
└── README.md               # Tento soubor
```

## Údržba

### Změna přihlašovacích údajů
Upravte soubor `admin-login.html` na řádku 89:
```javascript
if (username === 'admin' && password === 'penzion2024') {
```

### Zálohování cen
Ceny jsou uloženy v souboru `pricing.json`. Pro zálohování stačí zkopírovat tento soubor.

### Obnovení výchozích cen
Smazáním souboru `pricing.json` se ceny vrátí na výchozí hodnoty při dalším spuštění serveru.

### API endpointy
- `GET /api/prices` - Získání aktuálních cen
- `POST /api/prices` - Aktualizace cen
- `POST /api/auth` - Přihlášení do administrace

# Penzion u Kostela - Litvínov

Webová stránka penzionu v Litvínově s moderním designem a responzivním layoutem.

## 🚀 Deployment na Vercel

### Automatické nasazení
1. Připojte tento repozitář k Vercel
2. Vercel automaticky nasadí web
3. Získáte URL: `https://penzion-u-kostela.vercel.app`

### Manuální nasazení
```bash
# Instalace Vercel CLI
npm i -g vercel

# Přihlášení
vercel login

# Deployment
vercel
```

## 📁 Struktura projektu

```
├── index.html          # Hlavní stránka
├── about.html          # O penzionu
├── rooms.html          # Pokoje a ceny
├── gallery.html        # Fotogalerie
├── contact.html        # Kontakt
├── pricing.json        # Ceny (JSON)
├── vercel.json         # Vercel konfigurace
├── assets/
│   ├── css/
│   │   └── styles.css  # Styly
│   ├── js/
│   │   ├── main.js     # Hlavní JavaScript
│   │   └── pricing.js  # Správa cen
│   └── images/         # Obrázky
└── README.md
```

## 💰 Správa cen

Ceny se načítají z `pricing.json`:
```json
{
  "single1": 800,    // 1 osoba, 1 noc
  "single2": 700,    // 1 osoba, 2+ nocí
  "double1": 1300,   // Dvoulůžkový, 1 noc
  "double2": 1100,   // Dvoulůžkový, 2+ nocí
  "triple1": 1800,   // Třílůžkový, 1 noc
  "triple2": 1500    // Třílůžkový, 2+ nocí
}
```

**Pro změnu cen:** Upravte `pricing.json` a pushněte do Git.

## 🎨 Funkce

- ✅ Responzivní design
- ✅ Moderní UI/UX
- ✅ Fotogalerie
- ✅ Ceník s cenami
- ✅ Kontaktní informace
- ✅ Optimalizováno pro mobily

## 📞 Kontakt

- **Telefon**: +420 777 360 346
- **Email**: penzionlitvinov@seznam.cz
- **Adresa**: Kostelní 35, Litvínov

## 🌐 Doména

Pro připojení vlastní domény:
1. V Vercel dashboardu přidejte Custom Domain
2. Nastavte DNS záznamy u poskytovatele domény
3. Počkejte na propagaci (max 24h)

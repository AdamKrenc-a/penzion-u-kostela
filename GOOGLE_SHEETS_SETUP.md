# Nastavení Google Sheets pro správu cen

## 📋 Krok 1: Vytvoření Google Sheets

1. **Jděte na [sheets.google.com](https://sheets.google.com)**
2. **Vytvořte nový tabulkový procesor**
3. **Přejmenujte na "Penzion u Kostela - Ceny"**

## 📊 Krok 2: Nastavení struktury

### První list: "Ceny"
```
A1: Typ pokoje
B1: 1 noc
C1: 2+ nocí

A2: 1 osoba
B2: 800
C2: 700

A3: Dvoulůžkový pokoj
B3: 1300
C3: 1100

A4: Třílůžkový pokoj
B4: 1800
C4: 1500
```

### Druhý list: "API"
```
A1: single1
B1: 800

A2: single2
B2: 700

A3: double1
B3: 1300

A4: double2
B4: 1100

A5: triple1
B5: 1800

A6: triple2
B6: 1500
```

## 🔗 Krok 3: Publikování

1. **Klikněte na "Sdílet" (vpravo nahoře)**
2. **Změňte na "Kdokoli s odkazem může zobrazit"**
3. **Klikněte "Hotovo"**

## 📡 Krok 4: Získání URL

1. **Klikněte na "Soubor" → "Publikovat na webu"**
2. **Vyberte list "API"**
3. **Klikněte "Publikovat"**
4. **Zkopírujte URL**

## 🔧 Krok 5: Aktualizace webu

Pošlete mi URL a já aktualizuji web, aby načítal ceny z Google Sheets.

## 💡 Tipy pro používání

- **Ceny měňte v listu "Ceny"** - je to přehlednější
- **List "API" se aktualizuje automaticky** podle vzorců
- **Změny se projeví na webu do 5 minut**
- **Zálohujte si ceny** před velkými změnami

## 📱 Vzorce pro automatickou synchronizaci

V listu "API" použijte tyto vzorce:

```
B1: =Ceny!B2
B2: =Ceny!C2
B3: =Ceny!B3
B4: =Ceny!C3
B5: =Ceny!B4
B6: =Ceny!C4
```

Tím se ceny automaticky synchronizují mezi listy!

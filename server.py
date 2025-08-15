#!/usr/bin/env python3
"""
Jednoduchý server pro správu cen penzionu
"""
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Povolení CORS pro frontend

# Cesta k JSON souboru s cenami
PRICING_FILE = 'pricing.json'

# Výchozí ceny
DEFAULT_PRICES = {
    "single1": 800,
    "single2": 700,
    "double1": 1300,
    "double2": 1100,
    "triple1": 1800,
    "triple2": 1500
}

def load_prices():
    """Načte ceny z JSON souboru"""
    try:
        if os.path.exists(PRICING_FILE):
            with open(PRICING_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
    except Exception as e:
        print(f"Chyba při načítání cen: {e}")
    return DEFAULT_PRICES

def save_prices(prices):
    """Uloží ceny do JSON souboru"""
    try:
        with open(PRICING_FILE, 'w', encoding='utf-8') as f:
            json.dump(prices, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"Chyba při ukládání cen: {e}")
        return False

@app.route('/')
def index():
    """Hlavní stránka"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_file(filename):
    """Servíruje statické soubory"""
    return send_from_directory('.', filename)

@app.route('/api/prices', methods=['GET'])
def get_prices():
    """API endpoint pro získání cen"""
    prices = load_prices()
    return jsonify({
        'success': True,
        'prices': prices,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/prices', methods=['POST'])
def update_prices():
    """API endpoint pro aktualizaci cen"""
    try:
        data = request.get_json()
        if not data or 'prices' not in data:
            return jsonify({'success': False, 'error': 'Chybí data cen'}), 400
        
        prices = data['prices']
        
        # Validace cen
        required_keys = ['single1', 'single2', 'double1', 'double2', 'triple1', 'triple2']
        for key in required_keys:
            if key not in prices:
                return jsonify({'success': False, 'error': f'Chybí cena pro {key}'}), 400
            if not isinstance(prices[key], int) or prices[key] < 0:
                return jsonify({'success': False, 'error': f'Neplatná cena pro {key}'}), 400
        
        # Uložení cen
        if save_prices(prices):
            return jsonify({
                'success': True,
                'message': 'Ceny byly úspěšně uloženy',
                'timestamp': datetime.now().isoformat()
            })
        else:
            return jsonify({'success': False, 'error': 'Chyba při ukládání cen'}), 500
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/auth', methods=['POST'])
def authenticate():
    """API endpoint pro autentifikaci"""
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        # Jednoduchá autentifikace (v produkci by měla být bezpečnější)
        if username == 'admin' and password == 'penzion2024':
            return jsonify({
                'success': True,
                'token': 'admin-token',
                'message': 'Přihlášení úspěšné'
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Nesprávné přihlašovací údaje'
            }), 401
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 Spouštím server pro Penzion u kostela...")
    print("📍 Server běží na: http://localhost:8080")
    print("🔐 Admin panel: http://localhost:8080/admin-login.html")
    print("📊 API endpoint: http://localhost:8080/api/prices")
    print("⏹️  Pro zastavení stiskněte Ctrl+C")
    print("-" * 50)
    
    # Get port from environment variable (Railway) or use default
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=False)

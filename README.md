# 🦋 Le Village Numérique Résistant

![Beaucoup trop goatesque](./public/img/readme-background.png)

> **Projet pour la Nuit de l'Info 2025** — 4 & 5 Décembre 2025

## 🏆 Équipe

**Beaucoup trop goatesque** 🐐  
IUT A — Toulouse

### Membres

- **Kilian GUERIN**
- **Tom TESTU**
- **Timéo GOSGNACK**
- **Luka CHABOT**
- **Soraya IYANGUI**
- **Kohaina ATEO**

---

## 🎯 Le Projet

### Concept : David vs Goliath 2.0

L'Empire des Big Tech impose l'obsolescence programmée. Avec la fin de Windows 10, des millions de PC risquent d'être jetés.

**Notre mission :** Promouvoir la démarche **NIRD** (Numérique Inclusif, Responsable et Durable) auprès des établissements scolaires.

### La Solution

- 🐧 **Linux** — Systèmes d'exploitation libres et légers
- ♻️ **Réemploi** — Donner une seconde vie aux vieux PC
- 🔓 **Logiciels Libres** — Alternatives éthiques et gratuites
- 🛡️ **Souveraineté** — Vos données restent les vôtres

---

## 🚀 Lancer le projet

### Prérequis

- Node.js (v18+)
- npm

### Installation

```bash
# Cloner le projet
git clone <repo-url>
cd village-numerique-resistant

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

### Build

```bash
npm run build
npm run preview
```

---

## 🛠️ Stack Technique

- **React 19** + **TypeScript**
- **Vite** — Build tool ultra-rapide
- **Tailwind CSS** — Styling utilitaire
- Animations CSS personnalisées

---

## 📁 Structure

```
├── components/          # Composants React
│   ├── HeroContent.tsx
│   ├── ComponentsSection.tsx
│   ├── FeedbacksSection.tsx
│   ├── SloganSection.tsx
│   └── NirdButton.tsx   # Bouton custom avec effet glitch
├── img/                 # Assets (logos)
├── App.tsx              # Composant principal
├── index.tsx            # Point d'entrée
└── index.html
```

---

## 🔗 Liens

- [Site officiel NIRD](https://nird.forge.apps.education.fr/)
- [Nuit de l'Info](https://www.nuitdelinfo.com/)

---

## ✨ Features

### 1. Goli-Chat : L'IA de l'Empire 🤖

Un chatbot satirique qui incarne la mauvaise foi des Big Tech.

- **Comportement :** Il ne répond jamais utilement. Il détourne la conversation pour promouvoir la surveillance ou l'achat de matériel neuf.
- **Interaction :**
  - Cliquez sur son avatar pour le faire "Rager" (effets de secousse).
  - Au bout de 5 clics... 💥 (Surprise).
- **Technique :** Géré par `ChatBruti.tsx`. Les réponses sont piochées aléatoirement dans une liste de "Punchlines Maléfiques".

![Screenshot montrant le ChatBot](https://github.com/Sneyko/village-numerique-resistant/blob/main/public/img/chatbot.png)

### 2. L'Arsenal de la Résistance 🛡️

Une présentation interactive des outils du Libre sous forme de "Cartes RPG".

- **Concept :** Chaque logiciel (Linux, Firefox, VLC) est présenté comme un héros avec :
  - Son **Ennemi Juré** (ex: Windows 11).
  - Son **Pouvoir Spécial** (ex: Immunité aux virus).
- **Usage :** Cliquez sur une carte pour déployer les détails tactiques

![Screenshot montrant l'arsenal de résistance](https://github.com/Sneyko/village-numerique-resistant/blob/main/public/img/arsenal.png)

### 3. Easter Egg : Le Câble Libre (Snake) 🐍

Un mini-jeu caché dans le site pour les initiés.

- **Activation :** Le joueur doit entrer le **Konami Code** sur son clavier :
  `↑ ↑ ↓ ↓ ← → ← →`
- **Gameplay :** Un serpent néon qui doit "manger" les bugs propriétaires pour nettoyer le système.
- **Game Over :** Un écran "Kernel Panic" s'affiche si vous échouez.

![Screenshot montrant le snake](https://github.com/Sneyko/village-numerique-resistant/blob/main/public/img/snake.png)

### 4. Design "Glitch" & Cyberpunk 👾

L'identité visuelle reflète le combat numérique.

- **Hero Section :** Titre "Typewriter" (machine à écrire) et effets de distorsion sur les mots-clés de l'Empire.
- **Animations :** Tout le site utilise `Framer Motion` pour des apparitions fluides et dynamiques.

### 5. Le Simulateur NIRD 🎮

Un véritable jeu de gestion et de stratégie codé en React, où le joueur incarne le responsable numérique d'un lycée.

- **Gameplay Complexe :** Le joueur doit gérer son établissement sur plusieurs années virtuelles.
- **Mécaniques :**
  - **Diagnostic :** Analyser le parc informatique existant.
  - **Actions :** Choisir des investissements (Achat PC, Migration Linux, Formation...) qui impactent les jauges.
  - **Indicateurs :** Gérer l'équilibre entre **Budget**, **Obsolescence** et **Satisfaction**.
  - **Événements Aléatoires :** Réagir aux imprévus (Panne serveur, Fin de support Windows) via un système de dialogue narratif.
- **Tech :** Moteur de jeu maison basé sur un *State Manager* complexe (`game/core/state.ts`) et des composants UI dynamiques.

![Screenshot montrant le jeu](https://github.com/Sneyko/village-numerique-resistant/blob/main/public/img/games.png)

---

## 📜 Licence

Projet open source sous licence **AGPL v3.0** — Libre comme Linux 🐧

---

<div align="center">

**Liberté. Égalité. Sobriété.** ✊

*Ne laissez pas l'Empire gagner. Passez au NIRD.*

</div>

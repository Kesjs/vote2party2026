# epsond - Plateforme Citoyenne de Vote

Une landing page moderne et institutionnelle pour une plateforme citoyenne de vote en ligne, développée avec Next.js 14+ et Tailwind CSS.

## 🎯 Objectif

Concevoir une landing page complète, moderne, crédible et 100% responsive pour présenter le concept de la plateforme epsond et inspirer confiance.

## 🛠 Stack Technique

- **Next.js 14+** avec App Router
- **TypeScript** pour la typologie robuste
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **Aucune librairie UI externe** (MUI, Shadcn, Chakra, etc.)

## 📁 Structure du Projet

```
src/
├── app/
│   ├── globals.css          # Styles globaux et animations
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Page d'accueil
├── components/
│   ├── Header.tsx           # Navigation sticky
│   └── Footer.tsx           # Footer avec liens légaux
├── sections/
│   ├── HeroSection.tsx      # Section principale avec CTA
│   ├── PartiesSection.tsx   # Présentation des partis
│   ├── HowToVoteSection.tsx # Guide de vote en 3 étapes
│   ├── VoteFormSection.tsx  # Formulaire de vote avec validation
│   └── ResultsSection.tsx   # Résultats en temps réel (mock)
└── data/
    └── mockData.ts          # Données centralisées et typées
```

## 🚀 Démarrage

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Ouvrir votre navigateur**
   ```
   http://localhost:3000
   ```

## ✨ Fonctionnalités

### 🎨 Design & UX
- **Design institutionnel** : Sérieux, citoyen, professionnel
- **Palette de couleurs** : Vert / blanc / gris
- **Animations sobres** : Hover, transitions, fade-in légers
- **Responsive design** : Mobile / tablette / desktop
- **Navigation sticky** avec menu mobile

### 📊 Sections Principales

1. **Hero Section**
   - Titre percutant
   - Sous-titre explicatif
   - CTA "Voter maintenant"
   - Statistiques indicatives

2. **Les Partis Politiques**
   - Cartes de présentation des partis
   - Informations structurées
   - Design cohérent avec couleurs de parti

3. **Comment Voter ?**
   - Processus en 3 étapes claires
   - Icônes explicatives
   - Message de sécurité

4. **Formulaire de Vote**
   - Validation frontend complète
   - Champs obligatoires et optionnels
   - CAPTCHA simulé
   - Message de succès après soumission

5. **Résultats en Temps Réel**
   - Répartition des votes avec graphiques
   - Participation par département
   - Participation par circonscription
   - Derniers votes (affichable/masquable)

### 🔧 Validation du Formulaire

- **Nom/Prénom** : Champs obligatoires
- **NIP** : Exactement 10 chiffres
- **Téléphone** : 8 à 15 chiffres
- **Email** : Format email valide
- **Parti/Département/Commune** : Sélections obligatoires
- **CAPTCHA** : Validation simulée

### 📱 Responsive

- **Mobile** : Menu hamburger, layout optimisé
- **Tablette** : Adaptation des grilles
- **Desktop** : Expérience complète avec tous les détails

## 🔒 Sécurité & Confidentialité

- **Aucune donnée réelle** collectée
- **Formulaire de démonstration** uniquement
- **Messages explicatifs** sur la nature simulée
- **Design inspirant confiance** mais transparent

## 🎯 Points Clés

- **Architecture claire** et maintenable
- **Code typé** avec TypeScript
- **Données mock centralisées** pour facile évolution
- **Base extensible** vers un backend sécurisé
- **Performance** avec Next.js 14 et optimisations
- **Accessibilité** avec focus states et sémantique HTML5

## 📈 Évolution Future

Cette base est conçue pour évoluer vers une plateforme complète :

- Intégration backend sécurisé
- Authentification des électeurs
- Système de vote crypté
- Dashboard d'administration
- Notifications en temps réel
- Export des résultats

## 📄 Licence

© 2023 epsond. Tous droits réservés.

---

**Note** : Ceci est une démonstration à but pédagogique. Aucun vote réel n'est enregistré et aucune donnée personnelle n'est conservée.

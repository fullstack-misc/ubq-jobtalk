# Jobtalk
## ⚙️ Prérequis

- Node.js LTS (v22) — à installer de préférence via [NVM](https://github.com/nvm-sh/nvm)

---

## 🚀 Installation
- Le projet est découpé en deux packages :
  - L’interface utilisateur : `/packages/ui`
  - La partie _API_ : `/packages/api`

### Étapes :

```bash
# UI
cd /packages/ui
npm install
npm run dev

# API
cd /packages/api
npm install
npm run dev
```

- La partie _API_ est disponible sur : [http://localhost:3000](http://localhost:3000)
- L’interface _UI_ est disponible sur : [http://localhost:5173](http://localhost:5173)


## 🎯 Objectif
- _Back-end_ :
  - [x] Lister les jobs
  - [x] Créer un job
  - [x] Modifier un job
  - [x] Supprimer un job
  - Bonus :
    - [x] Statistiques des jobs : `GET` sur http://localhost:3000/jobs/stats
    - [x] Swagger : `GET` sur http://localhost:3000/swagger
- _Front-end_ :
  - [x] Lister les jobs
  - [x] Créer un job
  - [x] Modifier un job
  - [x] Supprimer un job
  - [x] Ajouter des filtres et tris sur la liste des jobs :
    - poste
    - contrat
    - télétravail
    - date
    - salaire
  - [x] Modales pour la création et modification des jobs
  - Bonus :
    - [x] Statistiques des jobs http://localhost:5173/stats

## 🏁 Améliorations possibles
- _Back-end_ :
  - Ajouter des tests
- _Front-end_ :
  - Refactoriser le code
  - Ajouter des tests
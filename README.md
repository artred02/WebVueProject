### Mise en place de l'environnement de développement

#### Prérequis
- [NodeJs](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)
- [VueJs3/Vite](https://vitejs.dev/)

#### Installation
Tout d'abord, il faut installer les dépendances du projet. Pour cela, il faut lancer la commande suivante :
```bash
$ npm install
```
Puis, il faut démarrer le serveur de développement :
```bash
$ npm run dev
```
Enfin, il faut se rendre sur l'adresse suivante : [http://localhost:5173](http://localhost:5173)

#### Pourquoi ce projet ?
Premièrement, j'avais envie de réaliser une API en symfony avec API Platform. Après quelques heures de développement, j'avais une API fonctionnelle.
Cette API est un forum et contient un certains nombre d'appels différents que j'ai réalisés en VueJs3/Vite avec axios.

#### Mes objectifs
- Créer une API avec API Platform
- Créer une application avec VueJs3/Vite
- Dark Mode
- Responsive
- Gestion des utilisateurs
    - Créer un système de connexion
    - Créer un système de création de compte
- Gestion des posts
    - Créer un système de création de post
    - Créer un système de création de commentaire
- Créer un système de pagination

#### Ce que j'ai réussi à faire
- [x] Créer une API avec API Platform
- [x] Créer une application avec VueJs3/Vite
- [x] Dark Mode
- [x] Responsive
- [x] Gestion des utilisateurs
    - [x] Créer un système de connexion
    - [x] Créer un système de création de compte
- [x] Gestion des posts
    - [x] Créer un système de création de post
    - [x] Créer un système de création de commentaire
    - [x] Créer un système de suppression de post
- [x] Mise en production sur un serveur personnel
- [x] Ajout d'un nom de domaine
- [x] Ajout d'un certificat SSL


#### Ce que j'ai pas réussi à faire
- [ ] Créer un système de pagination (je n'ai pas réussi à faire fonctionner le système de pagination de API Platform)
- [ ] Créer un système de modification de post (en cours de développement)

#### Ce que j'ai appris
- [x] API Platform
- [x] VueJs3/Vite
- [x] Axios
- [x] Formater une date en javascript avec dayjs
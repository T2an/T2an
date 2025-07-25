# Portfolio Cybersécurité

Portfolio personnel d'un ingénieur en cybersécurité, développé avec Astro, React et Prisma.

## 🚀 Fonctionnalités

- **Portfolio professionnel** avec design terminal
- **Blog technique** avec articles sur la cybersécurité
- **Système d'authentification** complet (inscription/connexion)
- **Quiz interactif** sur les départements français
- **Interface responsive** et moderne

## 🛠️ Technologies

- **Frontend**: Astro, React, Tailwind CSS
- **Backend**: Astro Server API, Prisma ORM
- **Base de données**: SQLite
- **Authentification**: JWT avec cookies sécurisés
- **Déploiement**: Docker, Nginx

## 📦 Installation

### Prérequis
- Node.js 20+
- npm ou yarn
- Docker (optionnel)

### Développement local

1. **Cloner le repository**
```bash
git clone https://github.com/titouan-heyrendt/portfolio-cyber.git
cd portfolio-cyber
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer l'environnement**
```bash
# Créer le fichier .env pour le développement
cp env.example .env
# Modifier les variables selon votre configuration
# IMPORTANT: Changez le JWT_SECRET !
```

4. **Initialiser la base de données**
```bash
# Appliquer les migrations
npx prisma migrate dev

# Initialiser avec des données d'exemple (optionnel)
node dev/seed-database.js
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

### Production avec Docker

1. **Configurer l'environnement de production**
```bash
# Créer le fichier .env.production
cp env.production.example .env.production

# IMPORTANT: Générer une clé JWT forte
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Modifier .env.production avec vos vraies valeurs
# - Remplacer JWT_SECRET par la clé générée
# - Configurer SITE_URL avec votre domaine
```

## 🔒 Sécurité

### Variables d'environnement requises

```env
# Développement (.env)
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="votre-secret-jwt-dev"

# Production (.env.production)
NODE_ENV=production
DATABASE_URL="file:./prisma/prod.db"
JWT_SECRET="votre-secret-jwt-production-fort"
SITE_URL="https://votre-domaine.com"
```

### Bonnes pratiques de sécurité

- ✅ Mots de passe hashés avec bcrypt (12 rounds)
- ✅ JWT avec expiration (7 jours)
- ✅ Cookies HttpOnly et Secure
- ✅ Validation stricte des entrées
- ✅ Headers de sécurité Nginx
- ✅ Utilisateur non-root dans Docker

## 📁 Structure du projet

```
src/
├── components/          # Composants React
├── layouts/            # Layouts Astro
├── pages/              # Pages et API routes
│   ├── api/           # Endpoints d'authentification
│   ├── games/         # Pages de jeux
│   └── blog/          # Pages du blog
├── lib/               # Utilitaires (JWT, etc.)
└── content/           # Contenu du blog

dev/                   # Outils de développement (non versionné)
├── interactive-queries.js  # Explorateur de base de données
├── sql-reference.md        # Guide SQL/Prisma
└── start-dev-tools.js      # Lanceur d'outils
```

## 🛠️ Outils de développement

Le projet inclut des outils de développement pour faciliter l'exploration et la manipulation de la base de données :

### Lanceur d'outils
```bash
node dev/start-dev-tools.js
```

### Explorateur de base de données
```bash
node dev/interactive-queries.js
```

### Prisma Studio (interface graphique)
```bash
npx prisma studio
```

### Guide SQL/Prisma
Consultez `dev/sql-reference.md` pour un guide complet des requêtes.

**Note :** Le dossier `dev/` est exclu du versioning et ne sera pas déployé en production.

## 🚀 Déploiement

### Variables d'environnement de production

**CRITIQUE**: Avant le déploiement en production :

1. **Générer une clé JWT forte** :
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

2. **Modifier `.env.production`** avec vos vraies valeurs
3. **Configurer votre domaine** dans `SITE_URL`
4. **Activer HTTPS** et décommenter HSTS dans `nginx.conf`

### Docker Compose

```bash
# Production
docker-compose -f docker-compose.yml up -d

# Vérifier les logs
docker-compose logs -f web
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🔗 Liens

- **GitHub**: https://github.com/titouan-heyrendt
- **LinkedIn**: https://linkedin.com/in/titouan-heyrendt 
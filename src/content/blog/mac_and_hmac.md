---
title: "Mac et HMAC"
description: "Détail de mécanisme d'intégrité MAC et HMAC"
pubDate: 2025-09-25
---

# MAC, HMAC et intégrité

## Introduction 
Les algorythmes de chiffrement aujourd'hui repose sur 4 pilliers : 

- Confidentialité
- **Intégrité**
- **Authenticité** 
- Non-répudiation

Le MAC, pour Message Authentication Code, est un processus qui permet s'assurer **l'intégrité** (que le message n'a pas été modifié) et **l'authenticité** (que le message provient d'un l'interlocuteur légitime) d'un message en générant un hash à partir du message initial et d'une clé secrete. Dans cette article, nous verront comment ce mécanisme à évoluer, ses usages et son concept.

## Garantir l'intégrité

Dans le cas d'une session chiffré entre 2 entités, les messages sont le plus généralement chiffré par un algorythme symétrique. Ce chiffrement est précédé par la mise en place de cette session chiffré, comme dans le cas du handshake TLS.

![TLS_1_2_handshake](assets/TLS_1_2_handshake.png)

Durant l'échange de données, les communications sont donc chiffrés symétriquement par une clé partagé : 

![Chiffrement symétrique](assets/symetrique.png)

L'interet du chiffrement symétrique est qu'il est beaucoup plus performant que le chiffrement asymétrique. Seulement, il ne permet pas la mise en place d'une signature numérique, celle-ci étant réalisées à partir de la clé privée de l'expediteur.

(Dans le chiffrement symétrique, il n'y a pas de concept de clé privée ou clé publique, simplement une clé partagé entre les 2 entités)

Dans le schéma ci-dessus, rien n'empeche un attaquant qui aurait un control partiel du réseau d'alterer le message, meme si il n'a pas accès à son contenu, et donc que sa **confidentialité** est préservée.

![MAC MITM](assets/mac_mitm_1.png)

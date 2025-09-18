---
title: "De SSL à TLS 1.3"
description: "Evolution des protocole de chiffrement des communications "
pubDate: 2025-09-25
---

# De SSL à TLS 1.3

## Introduction 

    SSL et TLS sont des protocoles fondamentaux qui assurent la sécurité de nos communications sur Internet. Utilisés quotidiennement lors de la navigation web, ils garantissent la confidentialité, l’intégrité et l’authentification des échanges. Si vous travaillez dans l’informatique, ces acronymes vous sont sans doute familiers, peut-être même que vous avez déjà une idée de leur rôle et de leur fonctionnement. Cet article retrace l’évolution de SSL vers TLS et met en lumière les raisons techniques et sécuritaires qui ont conduit à l’émergence de TLS 1.3, aujourd’hui incontournable.


## Principe et spectre

SSL et TLS repose sur le chiffrement asymétrique pour s'échanger une clé de chiffrement symétriquement. Cette clé permet de créé une session chiffrément dans laquelle transit les donneés applicative.
Ces protocoles ont évolués au fur et à mesure de la découverte de vulnérabilité et d'amélioration.

Les versions étudiées dans cet articles sont :

- SSL 1.0, 2.0 et 3.0

- TLS 1.0

- TLS 1.2 

- TLS 1.3 

## SSL 

Le protocole SSL (Secure Sockets Layer) a été développé par Netscape dans les années 1990 pour sécuriser les communications sur Internet. Taher Elgamal, alors principal scientifique chez Netscape, est souvent considéré comme le "père de SSL".

SSL 1.0 n’a jamais été publié en raison de failles de sécurité majeures et est resté au stade de développement en interne chez netscape. SSL 2.0 est donc  comme la premiere version de SSL réelement utilisé. Publié en février 1995, a été rapidement jugé insuffisant. Il présentait de nombreuses vulnérabilités, on peut citer : 

- Utilisation des mêmes clés pour l’authentification des messages et le chiffrement.

- Un MAC faible basé sur MD5 (MAC est une fonction cryptographique qui assure l’intégrité et l’authenticité d’un message). Ce MAC était vulnérable à une attaque nommé Length Extension Attack

- Absence de protection du handshake initial et de la fermeture explicite des messages, rendant possible des attaques de type man-in-the-middle.

Ces limites ont conduit à une refonte complète du protocole, aboutissant à SSL 3.0 en 1996 qui pose les bases des versions modernes de TLS. Malgré ses améliorations, SSL 3.0 a été rendu obsolète après la découverte d'une vulérabilité, [POODLE](https://openssl-library.org/files/ssl-poodle.pdf),en 2014. SSL 3.0 a été officiellement déprécié en 2015.

Face aux faiblesses persistantes de SSL et aux besoins croissants de sécurité, l’IETF a standardisé TLS (Transport Layer Security) en 1999. TLS s’appuie sur SSL 3.0 mais corrige ses vulnérabilités et introduit de nouvelles méthodes de chiffrement et d’échange de clés, ouvrant la voie aux versions modernes 1.2 et 1.3, plus rapides et sécurisées.









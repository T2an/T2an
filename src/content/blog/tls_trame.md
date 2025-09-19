---
title: "Analyse de trame TLS"
description: "Mise en place d'un laboratoire et analyse en profondeur du protocole TLS"
pubDate: 2025-09-25
---

# Analyse de trames TLS

## Introduction à TLS (Transport Layer Security)

TLS, pour `Transport Layer Security` est un protocole qui permet de sécuriser des communications. Il a été standardisée en janvier 1999 par l’IETF dans le [RFC 2246](https://datatracker.ietf.org/doc/html/rfc2246). Il a été créé pour garantir : 

- La confidentialité : Chiffrement des données échangées entre le client et le serveur

- L'Intégrité : Vérifier que les messages n’ont pas été modifiés pendant la transmission.

- L'Authentification : Le serveur peut être identifié à l’aide de certificats numériques (voir [certificat X.509](certificat_x509))

 Petite clarification :  TLS est l’évolution de SSL (Secure Sockets Layer), un protocole plus ancien désormais obsolète., on parle souvent de “SSL/TLS”, mais aujourd’hui, c’est TLS qui est systématiquement utilisé. 
 
L’usage le plus connu de TLS est son rôle dans le protocole HTTPS pour naviguer sur des sites web, mais TLS est également utilisé pour sécuriser les APIs REST, les WebSockets sécurisés (wss://), les protocoles de messagerie comme SMTP, IMAP et POP3 via TLS, certains VPN comme OpenVPN, ainsi que des protocoles IoT tels que MQTT over TLS, et d’autres services comme FTPS et LDAPS.

## Principe

Lorsqu'un client (navigateur, application) se connecte à un serveur TLS il initie un `Handshake`. Durant ce handshake, le client et le serveur négocient les paramètres cryptographiques (algorithmes de chiffrement, clés, etc.), le client authentifie le serveur et génère un secret, nommé "pre-master secret", qui sera dérivé pour créer une session chiffrée entre lui et le serveur. 

## De SSL à TLS 1.3


![TLS 1.2](assets/TLS_1_2_handshake.png) 

### Détail de l'échange :




# Créer CA
openssl genrsa -out ca.key 2048
openssl req -x509 -new -nodes -key ca.key -sha256 -days 365 -out ca.crt -subj "/CN=MyCA"

# Créer serveur
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr -subj "/CN=localhost"
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365 -sha256

# Créer client (pour MTLS)
openssl genrsa -out client.key 2048
openssl req -new -key client.key -out client.csr -subj "/CN=client"
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365 -sha256

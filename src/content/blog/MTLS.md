---
title: "MTLS"
description: "Une explication en profondeur des concepts et des usages autour de MTLS"
pubDate: 2025-09-25
---

# MTLS

## Introduction à MTLS

    Dans les cas "ordinaires", c'est-à-dire dans les cas où TLS n'est que TLS, le client authentifie le serveur qu'il souhaite requêter. Cependant le serveur lui n'authentifie pas le client. MTLS vient pallier à ce problème, en ajoutant une authentification du client auprès du serveur. L'authentification est donc mutuelle, on parle de mutual transport layer security, ou MTLS. 

    
  ## le besoin de MTLS

    Exprimé comme cela, l'introduction du MTLS semble évidente, on peut même se demander pourquoi à l'origine TLS n'incluait pas une authentification mutuelle. Il faut bien voir que l'idée initiale derrière TLS est d'établir un canal sécurisé entre 2 entités, en empêchant qu'une entité tierce n'intervienne durant la mise en place de ce canal (session). 
    Pour établir cette session, qui commence par l'échange de clés asymétriques, le client qui demande la mise en place de la session a besoin de s'assurer que sa requête initiale au serveur (ex : www.lemonde.fr ) n'a pas été interceptée par une entité intermédiaire malveillante qui lui enverrait ensuite sa propre clé publique. Le serveur aurait ensuite accès à toutes les données du client, en clair, sans même que le client ne s'en rende compte.
    
    - En reproduisant le comportement du serveur légitime
    - Ou bien en se plaçant comme relais => L'attaquant déchiffre, potentiellement modifie le message, puis le transmet au serveur en ouvrant sa propre session chiffrée avec le serveur et en transmettant les informations comme s'il était le client initial. 

    TLS répond donc à ce problème en introduisant de l'authentification, grâce à ce qu'on appelle le TLS handshake 

    

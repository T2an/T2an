---
title: "MTLS"
description: "Une explication en profondeur des concepts et des usages autour de MTLS"
pubDate: 2025-09-25
---

# MTLS

## Introduction à MTLS

    Dans les cas "ornidaire", c'est à dire dans les cas ou TLS n'est que TLS, le client authentifie le serveur qu'il souhaite requeter. Cependantle serveur lui n'authentifie pas le client. MTLS vient pallier à ce probleme,  en ajoutant une authentification du client au prés du serveur. L'authentification est donc mutuelle, parle de mutual transport layer security, ou MTLS. 

    
  ## le besoin de MTLS

    Exprimer comme cela, l'introduction du MTLS semble évidente, on peut meme se demander pourquoi à l'origine TLS n'incluait pas une authentification mutuelle. il faut bien voir que l'idée initial derrier TLS est d'établir un canal sécurisé entre 2 entités, en empechant qu'une entités tierces n'interviennent durant la mise en place de ce canal (session). 
    Pour établir cette session, qui commence par l'échange de clé asymétrique, le client qui demande la mise en place la session a besoin de s'assurer sa requete initial au serveur (ex : www.lemonde.fr ) n'a pas été intercepté par une entités intermédiaire malveillante qui lui enverait ensuite sa propre clé publique. Le serveur aurait ensuite accès à toute les donneés du client, en clair, sans meme que le client ne s'en compte.
    
    - En reprodusant le comportement du serveur légitime
    - Ou bien en se placant comme relais => L'attaquant déchiffre, potentiellement modifie le message, puis le transmet au serveur en ouvrant sa propre session chiffrés avec le serveur et en transmettant les informations comme si il etait le client initial. 

    TLS répond donc à ce probleme en introduisant de l'authentification, grace à ce qu'on appel le TLS handshake 

    

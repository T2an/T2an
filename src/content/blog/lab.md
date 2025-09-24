# LDAP and IAC lab

## Lab 

Le lab est composé de 7 machines virtuelles :

VM 1 : Contrôleur d’infra

- OS : [Rocky Linux 10](https://rockylinux.org/fr-FR/download)

- Rôle : machine d’admin avec Ansible, Terraform, Git, Docker

VM 2 : Serveur LDAP

- OS : [Ubuntu 24.04](https://ubuntu.com/download/server)

- Rôle : OpenLDAP ou FreeIPA

VM 3 : K8s master

- OS : [Ubuntu 24.04](https://ubuntu.com/download/server)

- Rôle : Noeud master Kubernetes (Docker, Helm, Kubelet, Kubectl, etc.)

VM 4 : K8s worker (node)

- OS : [Ubuntu 24.04](https://ubuntu.com/download/server) 
- Rôle : Execute les charges de travail (Applications, databases, web servers, etc.)

VM 5 : K8s worker 2 (node)

- OS : [Ubuntu 24.04](https://ubuntu.com/download/server) 
- Rôle : Execute les charges de travail (Applications, databases, web servers, etc.)

VM 6 : Client Linux (Bureautique)

- OS : [Ubuntu 24.04](https://ubuntu.com/download/server) 

VM 7 : Client Windows (Bureautique)

- OS : [Windows 10](https://www.microsoft.com/en-us/evalcenter/download-windows-11-iot-enterprise-ltsc-eval)

## Ce que le lab apporte : 


1. IaC avec Terraform

    - Définir l’infra (VM, réseau, stockage) en .tf.

    - Lancer terraform apply pour créer les VM automatiquement.

    - Détruire/recréer → tester l’aspect éphémère.

2. Automatisation avec Ansible

    - Installer automatiquement Apache/Nginx sur le serveur web.

    - Déployer une DB PostgreSQL avec un utilisateur et un schéma.

    - Gérer les utilisateurs Linux via Ansible.

3. Gestion d’un annuaire LDAP

    - Installer OpenLDAP.

    - Créer une arborescence d’utilisateurs/groupes.

    - Configurer un client Linux pour authentifier via LDAP.

4. Gestion de parc simulée

    - Utiliser Ansible pour pousser des mises à jour sur tous les clients.

    - Déployer un logiciel (ex : fail2ban, htop) en une commande.

    - Simuler un inventaire de machines avec Ansible + LDAP.

5. Sécurité & réseau

    - Mettre en place un pare-feu iptables/nftables géré par Ansible.

    - Surveiller la dispo des services (ping, curl, ansible-ping).
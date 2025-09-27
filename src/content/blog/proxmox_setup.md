---
title: "Proxmox setup"
description: "How to have a complete setup with Proxmox"
pubDate: 2024-10-01
---


# Proxmox setup

##

Download the ISO from the Proxmox website. 

```
https://www.proxmox.com/en/products/proxmox-virtual-environment/get-started
```

Once setup, you can access the Proxmox VE web interface at `https://<ip_address>:8006`.

You want to access your proxmox server console, you can do it via the web interface, but i prefere to use ssh.

we are going to run several update and upgrade commands to ensure you have the latest version of Proxmox VE and the required packages.

Go to https://community-scripts.github.io/ProxmoxVE/scripts?id=post-pve-install, copy the script and paste it in your terminal.

```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/tools/pve/post-pve-install.sh)"
```

You can now run a upgrade using the dedicated proxmox command : 

```
pveupgrade
```
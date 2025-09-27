---
title: "Introduction to Firewall"
description: "An introduction to firewall and its different types, including a quick overview of statefull and stateless firewall, application firewall and next generation firewall"
pubDate: 2025-09-25
---

# Statefull and stateless firewall

## Introduction

A firewall is a security device that controls incoming and outgoing network traffic between 2 zone with different level of trust, for exemple between the public internet and a private network.

Its main purpose is to enforce a security policy by allowing or blocking traffic based on predefined rules. Organizations can configure these rules to permit or deny traffic based on various criteria, such as source and destination IP addresses, port numbers, and protocol type.

![Firewall](assets/firewall_zone.png)

A firewall can be implemented as either a hardware or a software solution. Hardware firewalls typically provide higher performance, better isolation, and more robust protection against network-level attacks, making them suitable for environments with high traffic volumes. They are, however, more expensive and less flexible. Software firewalls, by contrast, offer greater flexibility and easier deployment, but are generally constrained by host resources and provide less robust security under heavy loads.

We can also classify firewalls by the way they process the traffic.

## Stateless firewall

Stateless firewall don't maintain any knowledge or memory of the past network connections. They evaluate each network packet individually without considering the context of the network flow.
Stateless firewalls will take into account informations comming mostly from the layer 3 and layer 4 of the OSI model, such as the source and destination IP addresses, the source and destination ports, the protocol, ect.


## Statefull firewall

Stateful firewalls provide stronger security by considering the entire flow and context of network traffic, rather than inspecting packets in isolation. They can detect, block, and prevent certain types of attacks that stateless firewalls might miss. In addition, they are able to allow or deny traffic based on connection context—for example, permitting a response from a server that was recently contacted by the same client. Like stateless firewalls, they primarily rely on information from Layer 3 (network) and Layer 4 (transport) of the OSI model.

However, this added “intelligence” comes at a cost: stateful firewalls must store and track session states, which requires additional processing and memory. As a result, they can introduce higher resource consumption and potential latency compared to simpler stateless firewalls.

## Application firewall

An application firewall is a specialized type of firewall that focuses on inspecting and controlling traffic at the application layer (Layer 7). Unlike traditional network-layer firewalls that focus on IP addresses and ports, application firewalls inspect the content of network packets to detect and block malicious activities. 

The most typical example of application firewall is the web application firewall (WAF). It allow to inspect the header and content of an http/https and can be configure to deny certain patterns, method, headers, ect. You can for exemple detect XSS/SQL injection, path traversal, file inclusion, ect

# Project Title : < PROJET SOA >
# Authors: < Hayder Guedhami && Maryam Landolsi > 

# Microservices Architecture
(![alt text](<Microservices Architecture.jpg>))

# Documentation des Microservices de l'Application

Bienvenue dans notre documentation sur les microservices qui alimentent notre application.
Explorez avec nous l'architecture qui soutient chaque aspect de notre système, depuis la gestion des
livres jusqu'à la prise en charge des commandes et la gestion des utilisateurs.

## Microservice : BookService

Responsable de la gestion des livres et des emprunts, le BookService offre une gamme complète de
fonctionnalités, des opérations CRUD de base aux interactions avancées avec d'autres composants via
REST et Kafka.

### Schémas de Données

Le microservice BookService utilise les schémas de données suivants :

**Livre** : Représente un livre dans l'application. Le schéma inclut les champs suivants :
- **id** (entier) : Identifiant unique du livre.
- **title** (chaîne de caractères) : Titre du livre.
- **author** (chaîne de caractères) : Auteur du livre.
- **description** (chaîne de caractères) : Description du livre.
- **pages** (entier) : Nombre de pages.
- **category** (chaîne de caractères) : Catégorie du livre.
- **available** (booléen) : Disponibilité du livre.

### Points d'Entrée

Le microservice BookService expose les points d'entrée suivants pour interagir avec les livres:
- **CreateBook** (POST "/book") : Permet de créer un nouveau livre en fournissant les informations du livre.
- **GetBooks** (GET "/books") : Récupère la liste de tous les livres.
- **GetBook** (GET "/book/:id") : Récupère les détails d'un livre spécifique en fournissant l'identifiant du livre.
- **DeleteBook** (DELETE "/book/:id") : Supprime un livre spécifique en fournissant son identifiant.
- **UpdateBook** (PUT "/book/:id") : Met à jour les informations d'un livre existant en fournissant son id.

### Interactions

Le microservice BookService peut être interagi avec :
- **API REST** : Permet l'interaction avec le microservice BookService via des requêtes HTTP. L'API REST offre des points d'extrémité pour réaliser des opérations CRUD sur les livres.
- **Kafka** : Permet la publication et la consommation des messages liés aux livres en utilisant la messagerie Kafka. Cela permet une communication asynchrone et une architecture orientée événements pour les événements liés aux livres.

## Microservice : OrderService

Le OrderService assure la gestion des commandes, permettant la création, la récupération, la mise à jour et la suppression des emprunts. Avec ses points d'entrée et ses interactions via gRPC et Kafka, ce service garantit une coordination fluide des activités de commande.

### Schémas de Données

Le microservice OrderService utilise le schéma de données suivant :

**Order** : Représente un emprunt de livre effectué par un utilisateur. Le schéma inclut les champs suivants :
- **id** (entier) : Identifiant unique pour l’ordre.
- **user_id** (entier) : Identifiant du user ayant passé l’ordre.
- **book_id** (entier) : Identifiant du livre.
- **user_name** (chaîne de caractères) : Nom de l’utilisateur.
- **book_title** (chaîne de caractères) : Titre du livre.
- **quantity** (entier) : Quantité.
- **price** (décimal) : Montant total.

### Points d'Entrée

Le microservice OrderService expose les points d'entrée suivants pour interagir avec les commandes :
- **CreateOrder** : Permet de créer une nouvelle commande en fournissant les informations sur la commande.
  - Requête : CreateOrderRequest
  - Réponse : CreateOrderResponse
- **GetOrder** : Récupère les détails spécifiques en fournissant l'identifiant de la commande.
  - Requête : GetOrderRequest
  - Réponse : GetOrderResponse
- **UpdateOrder** : Mettre à jour une commande de livre existante par ID.
  - Requête : UpdateOrderRequest
  - Réponse : UpdateOrderResponse
- **DeleteOrder** : Supprime une commande de livre par ID.
  - Requête : DeleteOrderRequest
  - Réponse : DeleteOrderResponse
- **ListOrders** : Liste toutes les commandes de livres.
  - Requête : ListOrdersRequest
  - Réponse : ListOrdersResponse

### Interactions

Le microservice OrderService peut être interagi avec :
- **gRPC** : Permet l'interaction avec le microservice OrderService via des appels RPC (Remote Procedure Call). Le service gRPC offre des méthodes déjà décrites pour créer, lire, mettre à jour et supprimer des commandes de livres.
- **Kafka** : Permet la publication et la consommation des messages liés aux ordres en utilisant la messagerie Kafka. Cela permet une communication asynchrone et une architecture orientée événements pour les événements liés aux ordres.

## Microservice : UserService

Au cœur de la gestion des utilisateurs, le UserService facilite la création, la récupération, la mise à jour et la suppression des comptes utilisateur. Grâce à son utilisation de GraphQL et Kafka, il offre une flexibilité remarquable dans la gestion des informations utilisateur.

### Schémas de Données

Le microservice UserService utilise les schémas de données suivants :

**User** : Représente l’utilisateur de l'application. Le schéma inclut les champs suivants :
- **id** (entier) : Identifiant unique du user.
- **name** (chaîne de caractères) : Le nom du user.
- **email** (chaîne de caractères) : L'adresse e-mail du user.
- **age** (Number) : L'âge du user.
- **createdAt** (String) : La date de création du compte user, stockée au format de chaîne de caractères.

### Points d'Entrée

Le microservice UserService expose les points d'entrée suivants pour interagir avec les users :
- **createUser** : Permet de créer un nouveau user.
- **GetUser** : Récupère les détails d'un user spécifique en fournissant son identifiant.
- **DeleteUser** : Supprime un user spécifique en fournissant son identifiant.
- **editCustomer** (PUT) : Met à jour les informations d'un user existant en fournissant son id.

### Interactions

Le microservice UserService peut être interagi avec :
- **GraphQL** : Facilite l'interaction avec le microservice en utilisant des requêtes, des mutations et des abonnements GraphQL. GraphQL offre une manière souple et efficace d'interroger et de manipuler les données.
- **Kafka** : Permet la publication et la consommation des messages liés aux utilisateurs en utilisant la messagerie Kafka. Cela permet une communication asynchrone et une architecture orientée événements pour les événements liés aux utilisateurs.

---

Cette documentation fournit une vue d'ensemble des microservices, des schémas de données utilisés, des points d'entrée, et des interactions entre les microservices dans notre application. Elle nous aide à comprendre la structure globale de l'application et à nous guider sur la manière d'interagir avec les microservices en utilisant soit l'API REST, soit l'API GraphQL, soit l'API gRPC, soit l'API Kafka.


<!-- Run the books.js  For microservices REST script in the books directory-->
node books/books.js

<!-- Run the index.js For microservices GRAPHQL script in the Users directory -->
node Users/UserMicroservices.js 
<!--  Run the apiGateway.js microservices REST script in the orders directory -->
node Users/apiGateway.js 

<!--  Run the order.js microservices GRAPHQL script in the orders directory -->
node orders/order.js

<!-- Start ZooKeeper server with configuration file -->
zookeeper-server-start.bat .\config\zookeeper.properties


<!-- Start Kafka server with configuration file -->
kafka-server-start.bat .\config\server.properties


<!-- Start Kafka console producer to send messages to "book-topic" topic on localhost:9092 -->
kafka-console-producer.bat --topic book-topic --bootstrap-server localhost:9092
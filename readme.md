# Personal Chatting Server

Hi! It's my project **personal-chatting-system** for server with authentication using Apollo Server and Javascript.. If you want to check on my client code, go to my another repo by clicking [here]("https://gitlab.com/3ee-/personal-chat-client")

## Installation

Use the package manager [yarn](https://yarnpkg.com/) or [npm](https://nodejs.org/en/) to install this project.

```bash
-> cd project
-> yarn or npm install
```

## How to Run locally

to run this project you must set up on root `index.js` file

```bash
const knexConfig = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "your_db_username",
    password: "your_db_password",
    database: "your_db",
  },
};
```

Change this to your own credentials.

---

After that, you can create table on your own local, by executing this command

```bash
/* User Table */
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `bio` text,
  `password` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phoneNumber_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


/* Chat Table */
CREATE TABLE `chats` (
  `id` varchar(255) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `sender` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `conversationId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


/* Conversation Table */
CREATE TABLE `conversations` (
  `id` varchar(500) NOT NULL,
  `sender` varchar(255) NOT NULL,
  `recipient` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastMessage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

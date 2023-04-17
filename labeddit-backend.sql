-- Active: 1681174967019@@127.0.0.1@3306
--Tabela USERS
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password  TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME())
);
INSERT INTO users (id, name, email, password, role)
VALUES
    ("u001", "Fulano", "fulano@labeddit.com", "123456", "ADMIN"),
    ("u002", "Beltrana", "beltrana@labeddit.com", "987654", "NORMAL");
SELECT * FROM users;
UPDATE users SET role="ADMIN" WHERE id="u002";
DROP TABLE users;

--Tabela POSTS
CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT,
    comments INTEGER DEFAULT(0) NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);
INSERT INTO posts (id, creator_id, content)
VALUES
    ("p001", "u001", "Que fome!"),
    ("p003", "u001", "Me recomendem um filme para assistir"),
    ("p002", "u002", "O que vocês fazem no seu tempo vago?");
SELECT * FROM posts;
DROP TABLE posts;

--Tabela COMMENTS_POSTS
CREATE TABLE comments_posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    content TEXT,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);
INSERT INTO comments_posts (id, creator_id, content, post_id)
VALUES
    ("c001", "u002", "Também", "p001"),
    ("c002", "u002", "Piratas do Caribe: A maldição do Párola Negra", "p002"),
    ("c003", "u001", "Vlw, vou dar uma olhada", "p002");

SELECT * FROM comments_posts;
SELECT 
comments_posts.id,
comments_posts.content,
comments_posts.likes,
comments_posts.dislikes,
comments_posts.created_at,
comments_posts.updated_at,
users.id,
users.name
FROM comments_posts LEFT JOIN users 
ON users.id = comments_posts.creator_id;
DROP TABLE comments_posts;

--Tabela LIKES_DISLIKES
CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);
SELECT * FROM likes_dislikes;
DROP TABLE likes_dislikes;

--Tabela LIKES_DISLIKES_COMMENTS
CREATE TABLE likes_dislikes_comments(
    user_id TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    like INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (comment_id) REFERENCES comment_posts(id)
);
SELECT * FROM likes_dislikes_comments;
DROP TABLE likes_dislikes_comments;
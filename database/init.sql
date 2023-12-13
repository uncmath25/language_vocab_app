CREATE DATABASE language_learning_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE language_learning_app.languages (
    id INT(7) PRIMARY KEY,
    name VARCHAR(64) NOT NULL
);
INSERT INTO language_learning_app.languages VALUES
    (1, 'Spanish'),
    (2, 'German'),
    (3, 'English'),
    (4, 'Latin'),
    (5, 'Russian'),
    (6, 'French'),
    (7, 'Greek');

CREATE TABLE language_learning_app.users (
    id INT(7) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    default_language_id INT(7) NOT NULL,
    CONSTRAINT fk_users_default_language_id FOREIGN KEY (default_language_id) REFERENCES languages(id),
    CONSTRAINT fk_users_name UNIQUE (name)
);
INSERT INTO language_learning_app.users VALUES
    (NULL, 'Colton', 1),
    (NULL, 'Ephraim', 1),
    (NULL, 'Nathan', 1),
    (NULL, 'Danica', 1);

CREATE TABLE language_learning_app.passwords (
    user_id INT(7) PRIMARY KEY,
    password VARCHAR(64) NOT NULL,
    user_secret VARCHAR(64) NOT NULL,
    CONSTRAINT fk_passwords_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO language_learning_app.passwords VALUES
    (1, 'nuclear', 'COLTON_SECRET'),
    (2, '2552', 'EPHRAIM_SECRET'),
    (3, '2552', 'NATHAN_SECRET'),
    (4, 'hazel', 'DANICA_SECRET');

CREATE TABLE language_learning_app.user_languages (
    user_id INT(7) NOT NULL,
    language_id INT(7) NOT NULL,
    CONSTRAINT fk_user_languages_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_user_languages_language_id FOREIGN KEY (language_id) REFERENCES languages(id)
);
INSERT INTO language_learning_app.user_languages VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (2, 1),
    (2, 3),
    (3, 1),
    (3, 3),
    (4, 1),
    (4, 3);

CREATE TABLE language_learning_app.word_types (
    id INT(7) PRIMARY KEY,
    type VARCHAR(64) NOT NULL
);
INSERT INTO language_learning_app.word_types VALUES
    (1, 'other'),
    (2, 'noun'),
    (3, 'pronoun'),
    (4, 'verb'),
    (5, 'adjective'),
    (6, 'adverb'),
    (7, 'preposition'),
    (8, 'conjunction'),
    (9, 'phrase');

CREATE TABLE language_learning_app.card_practice_modes (
    id INT(7) PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    description VARCHAR(256) NOT NULL
);
INSERT INTO language_learning_app.card_practice_modes VALUES
    (1, 'New', 'only practices cards with new familiarity 0'),
    (2, 'Learn', 'only practices cards with learning familiarity 30'),
    (3, 'Review', 'only practices cards with reviewing familiarity 60'),
    (4, 'Refresh', 'only practices cards with learned familiarity 90'),
    (5, 'Random', 'randomly practices all cards that are not memorized'),
    (6, 'Weighted', 'same as Random mode, but selection is weighted towards less familiar cards');

CREATE TABLE language_learning_app.cards (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    user_id INT(7) NOT NULL,
    language_id INT(7) NOT NULL,
    word VARCHAR(64) NOT NULL,
    translation VARCHAR(256) NOT NULL,
    type_id INT(3) NOT NULL,
    details VARCHAR(256) NOT NULL,
    familiarity INT(3) NOT NULL,
    CONSTRAINT fk_cards_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_cards_language_id FOREIGN KEY (language_id) REFERENCES languages(id),
    CONSTRAINT fk_cards_type_id FOREIGN KEY (type_id) REFERENCES word_types(id)
);

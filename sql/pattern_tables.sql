SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Структура таблицы `pattern_tokens`
--

CREATE TABLE `pattern_tokens` (
  `lts` datetime NOT NULL DEFAULT current_timestamp(),
  `ats` datetime NOT NULL DEFAULT current_timestamp(),
  `token` varchar(32) NOT NULL,
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Структура таблицы `pattern_users`
--

CREATE TABLE `pattern_users` (
  `uid` int(11) NOT NULL,
  `email` text NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`roles`)),
  `blocked` tinyint(1) NOT NULL DEFAULT 0,
  `confirmed` tinyint(1) NOT NULL DEFAULT 0,
  `pass_hash` text NOT NULL,
  `extended` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{}' CHECK (json_valid(`extended`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `pattern_users`
--

INSERT INTO `pattern_users` (`uid`, `email`, `roles`, `blocked`, `confirmed`, `pass_hash`, `extended`) VALUES
(1, 'admin', '[\"admin\",\"default\"]', 0, 1, 'e10adc3949ba59abbe56e057f20f883e', '{\"name\":\"Админ\",\"position\":\"Админ\",\"phone\":\"admin\",\"secondName\":\"Админов\",\"ava_url\":\"no_ava.jpg\"}'),

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `pattern_users`
--

ALTER TABLE `pattern_users`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `email` (`email`) USING HASH;

--
-- Индексы таблицы `pattern_tokens`
--

ALTER TABLE `pattern_tokens`
  ADD PRIMARY KEY (`token`);
COMMIT;

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `pattern_users`
--
ALTER TABLE `pattern_users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



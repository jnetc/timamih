<?php
// список языков
$sites = array(
    "en" => "https://timamih.com/en/",
    "fi" => "https://timamih.com/fi/",
	"ru" => "https://timamih.com/ru/",
);

// получаем язык
$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

// проверяем язык
if (!in_array($lang, array_keys($sites))){
    $lang = 'fi';
}
// перенаправление на субдомен
header('Location: ' . $sites[$lang]);

?>

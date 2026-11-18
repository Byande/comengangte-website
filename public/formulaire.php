<?php
/**
 * Réception des formulaires du site (contact, soutenir, contribuer) sur l'hébergement Hostinger.
 * Envoie un e-mail au comité puis redirige vers /merci.
 * L'adresse de destination est lue dans formulaire-config.php (à créer à partir de formulaire-config.exemple.php).
 */
declare(strict_types=1);

$config = ['destinataire' => '', 'expediteur' => ''];
if (is_file(__DIR__ . '/formulaire-config.php')) {
    $config = array_merge($config, include __DIR__ . '/formulaire-config.php');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /contact', true, 303);
    exit;
}

// Piège à robots : ce champ caché doit rester vide.
if (!empty($_POST['site-web'])) {
    header('Location: /merci', true, 303);
    exit;
}

$champ = static fn(string $k): string => trim(strip_tags((string) ($_POST[$k] ?? '')));
$nom = $champ('nom');
$email = $champ('email');
$message = $champ('message');
$sujet = $champ('sujet') ?: 'Message depuis le site du COMENGA';

if ($nom === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: /contact?erreur=1', true, 303);
    exit;
}

$lignes = [];
foreach ($_POST as $k => $v) {
    if (in_array($k, ['site-web', 'form-name', 'message'], true)) continue;
    $valeur = trim(strip_tags((string) $v));
    if ($valeur !== '') $lignes[] = ucfirst(str_replace('-', ' ', $k)) . " : " . $valeur;
}
$corps = implode("\n", $lignes) . "\n\nMessage :\n" . $message . "\n\n—\nEnvoyé depuis " . ($_SERVER['HTTP_HOST'] ?? 'le site') . ' le ' . date('d/m/Y H:i');

$destinataire = $config['destinataire'];
if ($destinataire === '') {
    // Pas encore configuré : on consigne le message sur le serveur plutôt que de le perdre.
    @file_put_contents(__DIR__ . '/../formulaires-en-attente.log', "[" . date('c') . "] " . $sujet . "\n" . $corps . "\n\n", FILE_APPEND);
    header('Location: /merci', true, 303);
    exit;
}

$expediteur = $config['expediteur'] ?: 'site@' . preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'comengangte.com');
$entetes = [
    'From: ' . mb_encode_mimeheader("Site COMENGA'NGTE", 'UTF-8') . " <{$expediteur}>",
    "Reply-To: {$nom} <{$email}>",
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
];
@mail($destinataire, mb_encode_mimeheader($sujet, 'UTF-8'), $corps, implode("\r\n", $entetes));

header('Location: /merci', true, 303);
exit;

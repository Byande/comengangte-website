<?php
/**
 * Copier ce fichier en formulaire-config.php (sur l'hébergement ou dans public/) et renseigner l'adresse du comité.
 * Tant que `destinataire` est vide, les messages sont consignés dans formulaires-en-attente.log sur le serveur.
 */
return [
    'destinataire' => '',                 // ex. 'comite@comengangte.com'
    'expediteur'   => 'site@comengangte.com', // une adresse e-mail créée chez Hostinger pour ce domaine
];

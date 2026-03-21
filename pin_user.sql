-- Script pour mettre l'utilisateur avec le NIP 0819696114 tout en premier
-- À exécuter directement dans l'éditeur SQL de Supabase

-- D'abord, vérifions les infos de l'utilisateur à épingler
SELECT 
    id,
    first_name AS "Prénom",
    last_name AS "Nom",
    nip AS "NIP",
    email AS "Email",
    phone AS "Téléphone",
    created_at AS "Date actuelle"
FROM votes 
WHERE nip = '0819696114';

-- Mettre l'utilisateur vraiment tout en premier
UPDATE votes 
SET created_at = '2026-01-11 16:00:00+00'
WHERE nip = '0819696114';

-- Vérifier que l'utilisateur est maintenant en premier
SELECT 
    id,
    first_name AS "Prénom",
    last_name AS "Nom",
    nip AS "NIP",
    email AS "Email",
    phone AS "Téléphone",
    created_at AS "Date modifiée"
FROM votes 
ORDER BY created_at DESC
LIMIT 5;

-- Alternative: Si vous voulez qu'il soit encore plus récent (aujourd'hui même)
/*
UPDATE votes 
SET created_at = NOW()
WHERE nip = '0819696114';
*/

-- Pour revenir à la date originale si besoin (gardez cette valeur de sécurité)
-- UPDATE votes SET created_at = '2026-01-10 15:04:25.403+00' WHERE nip = '0819696114';

-- Script SQL pour voir tous les utilisateurs et identifier celui à supprimer
-- À exécuter directement dans l'éditeur SQL de Supabase

-- Compter le nombre total d'utilisateurs
SELECT 
    COUNT(*) AS "Nombre total d'utilisateurs"
FROM votes;

-- Voir tous les utilisateurs récents (les 50 derniers)
SELECT 
    id,
    first_name AS "Prénom",
    last_name AS "Nom",
    nip AS "NIP",
    email AS "Email",
    phone AS "Téléphone",
    departement AS "Département",
    commune AS "Commune",
    circonscription AS "Circonscription",
    arrondissement AS "Arrondissement",
    created_at AS "Date d'inscription"
FROM votes 
ORDER BY created_at DESC
LIMIT 50;

-- Pour voir TOUS les 135 utilisateurs (sans limite)
SELECT 
    id,
    first_name AS "Prénom",
    last_name AS "Nom",
    nip AS "NIP",
    email AS "Email",
    phone AS "Téléphone",
    created_at AS "Date d'inscription"
FROM votes 
ORDER BY created_at DESC;

-- Alternative: Voir par lots de 50 utilisateurs
-- Lot 1: Les 50 premiers (plus récents)
/*
SELECT 
    id,
    first_name AS "Prénom",
    last_name AS "Nom",
    nip AS "NIP",
    email AS "Email",
    phone AS "Téléphone",
    created_at AS "Date d'inscription"
FROM votes 
ORDER BY created_at DESC
LIMIT 50 OFFSET 0;
*/

-- Lot 2: Les 50 suivants
/*
SELECT 
    id,
    first_name AS "Prénom",
    last_name AS "Nom",
    nip AS "NIP",
    email AS "Email",
    phone AS "Téléphone",
    created_at AS "Date d'inscription"
FROM votes 
ORDER BY created_at DESC
LIMIT 50 OFFSET 50;
*/

-- Lot 3: Les 35 derniers
/*
SELECT 
    id,
    first_name AS "Prénom",
    last_name AS "Nom",
    nip AS "NIP",
    email AS "Email",
    phone AS "Téléphone",
    created_at AS "Date d'inscription"
FROM votes 
ORDER BY created_at DESC
LIMIT 50 OFFSET 100;
*/

-- Alternative: Voir les 10 plus récents uniquement
/*
SELECT 
    id,
    first_name AS "Prénom",
    last_name AS "Nom",
    nip AS "NIP",
    email AS "Email",
    phone AS "Téléphone",
    created_at AS "Date d'inscription"
FROM votes 
ORDER BY created_at DESC
LIMIT 10;
*/

-- Alternative: Chercher spécifiquement par téléphone ou NIP
/*
SELECT 
    id,
    first_name AS "Prénom",
    last_name AS "Nom",
    nip AS "NIP",
    email AS "Email",
    phone AS "Téléphone",
    created_at AS "Date d'inscription"
FROM votes 
WHERE phone = '0146279139' OR nip = '0819696114'
ORDER BY created_at DESC;
*/

-- Une fois que vous avez trouvé l'ID de l'utilisateur, utilisez cette requête pour supprimer:
-- DELETE FROM votes WHERE id = [ID_DE_L'UTILISATEUR];

-- Ou si vous préférez supprimer par téléphone/NIP:
-- DELETE FROM votes WHERE phone = '0146279139' OR nip = '0819696114';

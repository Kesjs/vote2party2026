-- Solution plus sûre pour mettre l'utilisateur en premier
-- À exécuter directement dans l'éditeur SQL de Supabase

-- D'abord, trouvons un UUID qui n'existe pas déjà
SELECT 
    id,
    first_name AS "Prénom",
    last_name AS "Nom",
    nip AS "NIP"
FROM votes 
WHERE nip = '0819696114' OR nip = '2991666439'
ORDER BY id;

-- Solution 1: Utiliser un timestamp pour générer un UUID unique
UPDATE votes 
SET id = '00000000-0000-0000-0000-' || EXTRACT(EPOCH FROM NOW())::text
WHERE nip = '0819696114';

-- Solution 2: Utiliser le NIP comme partie de l'UUID pour garantir l'unicité
/*
UPDATE votes 
SET id = '00000000-0000-0000-0000-0819696114'
WHERE nip = '0819696114';
*/

-- Solution 3: Utiliser un UUID généré aléatoirement mais qui sera premier
/*
UPDATE votes 
SET id = '00000001-0001-0001-0001-000000000001'
WHERE nip = '0819696114';
*/

-- Vérifier le résultat
SELECT 
    id,
    first_name AS "Prénom", 
    last_name AS "Nom",
    nip AS "NIP",
    email AS "Email",
    phone AS "Téléphone"
FROM votes 
WHERE nip = '0819696114' OR nip = '2991666439'
ORDER BY id;

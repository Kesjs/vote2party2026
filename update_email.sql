-- Script pour changer l'email de l'utilisateur
-- À exécuter directement dans l'éditeur SQL de Supabase

-- Changer l'email de ken2001babatounde@gmail.com en kenkenbabatounde@gmail.com
UPDATE votes 
SET email = 'kenkenbabatounde@gmail.com'
WHERE email = 'ken2001babatounde@gmail.com';

-- Vérifier que le changement a été effectué
SELECT 
    id,
    first_name AS "Prénom",
    last_name AS "Nom",
    nip AS "NIP",
    email AS "Email (modifié)",
    phone AS "Téléphone",
    created_at AS "Date d'inscription"
FROM votes 
WHERE email = 'kenkenbabatounde@gmail.com';

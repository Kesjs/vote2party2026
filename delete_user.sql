-- Script SQL pour supprimer l'utilisateur
-- À exécuter directement dans l'éditeur SQL de Supabase

-- ATTENTION: Cette action est irréversible !
-- Vérifiez bien l'utilisateur avant de supprimer

-- D'abord, vérifions qui va être supprimé
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
WHERE phone = '0146279139' OR nip = '0819696114';

-- Si vous êtes sûr de vouloir supprimer, exécutez la requête ci-dessous:
-- DELETE FROM votes WHERE phone = '0146279139' OR nip = '0819696114';

-- Alternative: Supprimer uniquement par téléphone
-- DELETE FROM votes WHERE phone = '0146279139';

-- Alternative: Supprimer uniquement par NIP  
-- DELETE FROM votes WHERE nip = '0819696114';

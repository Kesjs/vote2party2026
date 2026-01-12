-- Requête pour vérifier combien d'utilisateurs sont associés à l'UUID
-- À exécuter directement dans l'éditeur SQL de Supabase

SELECT 
    'Vérification UUID' AS info,
    COUNT(*) AS "nombre_d_utilisateurs",
    CASE 
        WHEN COUNT(*) = 0 THEN 'Aucun utilisateur trouvé'
        WHEN COUNT(*) = 1 THEN '1 utilisateur trouvé'
        ELSE CONCAT(COUNT(*)::text, ' utilisateurs trouvés')
    END AS "statut"
FROM votes 
WHERE id = '91c94e29-1b2b-4330-9cdc-b43cf7361628';

-- Pour voir les détails des utilisateurs avec cet UUID
SELECT 
    id,
    first_name AS "Prénom",
    last_name AS "Nom",
    nip AS "NIP",
    email AS "Email",
    phone AS "Téléphone",
    created_at AS "Date d'inscription"
FROM votes 
WHERE id = '91c94e29-1b2b-4330-9cdc-b43cf7361628';

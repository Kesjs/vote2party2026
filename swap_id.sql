-- Script pour modifier l'ID de l'utilisateur avec le NIP 0819696114
-- À exécuter directement dans l'éditeur SQL de Supabase

-- Alternative plus simple: utiliser l'UUID fourni
UPDATE votes 
SET id = '91c94e29-1b2b-4330-9cdc-b43cf7361628'
WHERE nip = '0819696114';

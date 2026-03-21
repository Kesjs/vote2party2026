-- UUID qui sera juste après le deuxième mais avant les autres
-- Utilisant le format de 020eb270-f019-4db4-aac6-21dd12ef3325
-- Premier: 001feecc-6287-4015-91b9-503a0b08813c
-- Deuxième: 0157cb2d-19ef-4584-978c-00244dc7239f
-- Notre UUID sera juste après le deuxième

UPDATE votes 
SET id = '016eb270-f019-4db4-aac6-21dd12ef3325'
WHERE nip = '0819696114';

-- Si celui-ci est déjà utilisé, essayez celui-ci (juste après) :
/*
UPDATE votes 
SET id = '017eb270-f019-4db4-aac6-21dd12ef3325'
WHERE nip = '0819696114';
*/

-- Ou celui-ci si les deux premiers sont pris :
/*
UPDATE votes 
SET id = '018eb270-f019-4db4-aac6-21dd12ef3325'
WHERE nip = '0819696114';
*/

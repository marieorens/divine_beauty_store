
-- Supprimer toutes les politiques existantes sur la table customers pour les recréer proprement
DROP POLICY IF EXISTS "Anyone can create customers" ON public.customers;
DROP POLICY IF EXISTS "Anyone can insert customers" ON public.customers;
DROP POLICY IF EXISTS "Authenticated users can create customers" ON public.customers;

-- Créer une politique simple et claire pour permettre l'insertion
CREATE POLICY "Allow all inserts on customers" 
ON public.customers 
FOR INSERT 
WITH CHECK (true);

-- Garder la politique pour la lecture
CREATE POLICY "Anyone can view customers" 
ON public.customers 
FOR SELECT 
USING (true);

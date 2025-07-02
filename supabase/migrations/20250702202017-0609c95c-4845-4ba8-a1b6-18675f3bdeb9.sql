
-- Modifier la politique RLS pour permettre la création de clients par tous les utilisateurs
DROP POLICY IF EXISTS "Authenticated users can create customers" ON public.customers;

-- Créer une nouvelle politique qui permet à tous de créer des clients
CREATE POLICY "Anyone can create customers" 
ON public.customers 
FOR INSERT 
WITH CHECK (true);

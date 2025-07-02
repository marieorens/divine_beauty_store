
-- Modifier la politique RLS pour permettre la création de commandes par tous les utilisateurs
DROP POLICY IF EXISTS "Authenticated users can create orders" ON public.orders;

-- Créer une nouvelle politique qui permet à tous de créer des commandes
CREATE POLICY "Anyone can create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- Modifier aussi la politique pour les order_items
DROP POLICY IF EXISTS "Authenticated users can create order items" ON public.order_items;

-- Créer une nouvelle politique qui permet à tous de créer des items de commande
CREATE POLICY "Anyone can create order items" 
ON public.order_items 
FOR INSERT 
WITH CHECK (true);

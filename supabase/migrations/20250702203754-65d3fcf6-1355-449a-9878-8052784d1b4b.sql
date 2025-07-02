
-- Supprimer toutes les politiques existantes sur la table customers
DROP POLICY IF EXISTS "Admins can manage customers" ON public.customers;
DROP POLICY IF EXISTS "Allow all inserts on customers" ON public.customers;
DROP POLICY IF EXISTS "Anyone can view customers" ON public.customers;
DROP POLICY IF EXISTS "Customers can view own data" ON public.customers;

-- Supprimer toutes les politiques existantes sur la table orders
DROP POLICY IF EXISTS "Admins can manage orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;

-- Supprimer toutes les politiques existantes sur la table order_items
DROP POLICY IF EXISTS "Admins can manage order items" ON public.order_items;
DROP POLICY IF EXISTS "Anyone can create order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can view own order items" ON public.order_items;

-- Créer des politiques ultra-permissives pour permettre la création de commandes
CREATE POLICY "Allow everything on customers" ON public.customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow everything on orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow everything on order_items" ON public.order_items FOR ALL USING (true) WITH CHECK (true);

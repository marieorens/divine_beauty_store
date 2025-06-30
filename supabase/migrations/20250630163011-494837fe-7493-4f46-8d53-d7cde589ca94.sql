
-- Créer des politiques RLS pour la table products
-- Permettre à tout le monde de lire les produits (pour l'affichage public)
CREATE POLICY "Anyone can view products" ON public.products
FOR SELECT USING (true);

-- Permettre à tout le monde d'insérer des produits (pour l'admin)
CREATE POLICY "Anyone can create products" ON public.products
FOR INSERT WITH CHECK (true);

-- Permettre à tout le monde de modifier des produits (pour l'admin)
CREATE POLICY "Anyone can update products" ON public.products
FOR UPDATE USING (true);

-- Permettre à tout le monde de supprimer des produits (pour l'admin)
CREATE POLICY "Anyone can delete products" ON public.products
FOR DELETE USING (true);

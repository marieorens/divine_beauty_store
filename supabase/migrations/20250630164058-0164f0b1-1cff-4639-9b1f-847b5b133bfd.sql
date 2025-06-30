
-- Ajouter une colonne pour marquer les produits vedettes
ALTER TABLE public.products ADD COLUMN is_featured BOOLEAN DEFAULT false;

-- Créer une table pour stocker plusieurs images par produit
CREATE TABLE public.product_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer des politiques RLS pour la table product_images
CREATE POLICY "Anyone can view product images" ON public.product_images
FOR SELECT USING (true);

CREATE POLICY "Anyone can create product images" ON public.product_images
FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update product images" ON public.product_images
FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete product images" ON public.product_images
FOR DELETE USING (true);

-- Activer RLS sur la table product_images
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

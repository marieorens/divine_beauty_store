
-- Créer un bucket pour stocker les images de produits
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- Créer des politiques pour permettre l'upload et la lecture des images
CREATE POLICY "Anyone can view product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can upload product images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Anyone can update product images" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can delete product images" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images');

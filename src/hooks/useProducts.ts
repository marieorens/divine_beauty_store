import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_images (
            id,
            image_url,
            is_primary,
            display_order
          )
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_images (
            id,
            image_url,
            is_primary,
            display_order
          )
        `)
        .eq("is_featured", true)
        .eq("active", true)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

// Nouveau hook pour tous les produits actifs (vedettes + réguliers)
export const useAllActiveProducts = () => {
  return useQuery({
    queryKey: ["all-active-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_images (
            id,
            image_url,
            is_primary,
            display_order
          )
        `)
        .eq("active", true)
        .order("is_featured", { ascending: false }) // Produits vedettes en premier
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useRegularProducts = () => {
  return useQuery({
    queryKey: ["regular-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_images (
            id,
            image_url,
            is_primary,
            display_order
          )
        `)
        .eq("is_featured", false)
        .eq("active", true)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ product, images }: { product: any; images: string[] }) => {
      // Créer le produit
      const { data: productData, error: productError } = await supabase
        .from("products")
        .insert([product])
        .select()
        .single();
      
      if (productError) throw productError;

      // Ajouter les images
      if (images.length > 0) {
        const imageInserts = images.map((imageUrl, index) => ({
          product_id: productData.id,
          image_url: imageUrl,
          is_primary: index === 0,
          display_order: index
        }));

        const { error: imagesError } = await supabase
          .from("product_images")
          .insert(imageInserts);

        if (imagesError) throw imagesError;
      }

      return productData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["featured-products"] });
      queryClient.invalidateQueries({ queryKey: ["all-active-products"] });
      toast({
        title: "Produit créé",
        description: "Le produit a été ajouté avec succès.",
      });
    },
    onError: (error) => {
      console.error('Create product error:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le produit.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates, images }: { id: string; updates: any; images?: string[] }) => {
      // Mettre à jour le produit
      const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;

      // Si de nouvelles images sont fournies, supprimer les anciennes et ajouter les nouvelles
      if (images && images.length > 0) {
        // Supprimer les anciennes images
        await supabase
          .from("product_images")
          .delete()
          .eq("product_id", id);

        // Ajouter les nouvelles images
        const imageInserts = images.map((imageUrl, index) => ({
          product_id: id,
          image_url: imageUrl,
          is_primary: index === 0,
          display_order: index
        }));

        const { error: imagesError } = await supabase
          .from("product_images")
          .insert(imageInserts);

        if (imagesError) throw imagesError;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["featured-products"] });
      queryClient.invalidateQueries({ queryKey: ["all-active-products"] });
      toast({
        title: "Produit mis à jour",
        description: "Les modifications ont été enregistrées.",
      });
    },
    onError: (error) => {
      console.error('Update product error:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le produit.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      // Récupérer les images pour les supprimer du storage
      const { data: images } = await supabase
        .from("product_images")
        .select("image_url")
        .eq("product_id", id);

      // Supprimer les images du storage
      if (images && images.length > 0) {
        for (const image of images) {
          if (image.image_url && image.image_url.includes('product-images')) {
            const imagePath = image.image_url.split('/').pop();
            if (imagePath) {
              await supabase.storage
                .from('product-images')
                .remove([imagePath]);
            }
          }
        }
      }

      // Supprimer l'ancienne image principale si elle existe
      const { data: product } = await supabase
        .from("products")
        .select("image_url")
        .eq("id", id)
        .single();

      if (product?.image_url && product.image_url.includes('product-images')) {
        const imagePath = product.image_url.split('/').pop();
        if (imagePath) {
          await supabase.storage
            .from('product-images')
            .remove([imagePath]);
        }
      }

      // Supprimer le produit (les images liées seront supprimées automatiquement via CASCADE)
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["featured-products"] });
      queryClient.invalidateQueries({ queryKey: ["all-active-products"] });
      toast({
        title: "Produit supprimé",
        description: "Le produit a été supprimé avec succès.",
      });
    },
    onError: (error) => {
      console.error('Delete product error:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit.",
        variant: "destructive",
      });
    },
  });
};

export const useUploadImage = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    },
    onError: (error) => {
      console.error('Upload error:', error);
      toast({
        title: "Erreur",
        description: "Impossible de téléverser l'image.",
        variant: "destructive",
      });
    },
  });
};

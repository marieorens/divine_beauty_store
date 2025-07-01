import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, useUploadImage } from "@/hooks/useProducts";
import { Plus, Edit, Eye, ArrowLeft, Trash2, Upload, X, Star } from "lucide-react";
import AdminNavigation from "@/components/AdminNavigation";

const AdminProducts = () => {
  const { toast } = useToast();
  const { data: products, isLoading } = useProducts();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  const uploadImageMutation = useUploadImage();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    chakra: "",
    stock: "",
    image_url: "",
    active: true,
    is_featured: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleFeaturedChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      is_featured: checked
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limiter à 5 images maximum
    const limitedFiles = files.slice(0, 5);
    setSelectedImages(prev => [...prev, ...limitedFiles].slice(0, 5));

    // Créer les aperçus
    limitedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews(prev => [...prev, reader.result as string].slice(0, 5));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const getPrimaryImage = (product: any) => {
    if (product.product_images && product.product_images.length > 0) {
      const primaryImage = product.product_images.find((img: any) => img.is_primary);
      return primaryImage?.image_url || product.product_images[0]?.image_url;
    }
    return product.image_url || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedImages.length < 2 && !editingProduct) {
      toast({
        title: "Images manquantes",
        description: "Veuillez ajouter au moins 2 images pour le produit.",
        variant: "destructive",
      });
      return;
    }

    try {
      let imageUrls: string[] = [];
      
      // Upload des nouvelles images
      if (selectedImages.length > 0) {
        for (const image of selectedImages) {
          const url = await uploadImageMutation.mutateAsync(image);
          imageUrls.push(url);
        }
      }

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image_url: imageUrls[0] || formData.image_url // Garder la première image comme image principale pour compatibilité
      };

      if (editingProduct) {
        await updateProductMutation.mutateAsync({ 
          id: editingProduct.id, 
          updates: productData,
          images: imageUrls.length > 0 ? imageUrls : undefined
        });
      } else {
        await createProductMutation.mutateAsync({ 
          product: productData, 
          images: imageUrls 
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    
    try {
      await deleteProductMutation.mutateAsync(productToDelete.id);
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      chakra: "",
      stock: "",
      image_url: "",
      active: true,
      is_featured: false
    });
    setEditingProduct(null);
    setSelectedImages([]);
    setImagePreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price?.toString() || "",
      category: product.category || "",
      chakra: product.chakra || "",
      stock: product.stock?.toString() || "",
      image_url: product.image_url || "",
      active: product.active ?? true,
      is_featured: product.is_featured ?? false
    });
    
    // Afficher les images existantes
    if (product.product_images && product.product_images.length > 0) {
      const sortedImages = product.product_images.sort((a: any, b: any) => a.display_order - b.display_order);
      setImagePreviews(sortedImages.map((img: any) => img.image_url));
    } else if (product.image_url) {
      setImagePreviews([product.image_url]);
    }
    
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (product: any) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-gray-300">Chargement des produits...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <AdminNavigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center">
            <Button variant="ghost" asChild className="mr-4 text-gray-300 hover:text-white">
              <Link to="/admin">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Retour au tableau de bord</span>
                <span className="sm:hidden">Retour</span>
              </Link>
            </Button>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Gestion des Produits</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              onClick={handleAddNew}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Ajouter un produit</span>
              <span className="sm:hidden">Ajouter</span>
            </Button>
            
            <Button variant="outline" asChild className="text-gray-300 border-gray-600 hover:bg-gray-800">
              <Link to="/" target="_blank">
                <Eye className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Voir le site</span>
                <span className="sm:hidden">Site</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {products?.map((product: any) => (
            <Card key={product.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-4 lg:p-6">
                <div className="aspect-square mb-4 bg-gray-700 rounded-lg overflow-hidden relative">
                  <img 
                    src={getPrimaryImage(product)} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.is_featured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white p-1 rounded-full">
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-white text-sm lg:text-base line-clamp-1">{product.name}</h3>
                  <p className="text-xs lg:text-sm text-gray-400 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base lg:text-lg font-bold text-red-400">{product.price}€</span>
                    <div className="flex gap-1">
                      <Badge variant={product.active ? "default" : "secondary"} className="text-xs">
                        {product.active ? "Actif" : "Inactif"}
                      </Badge>
                      {product.is_featured && (
                        <Badge className="text-xs bg-yellow-500 hover:bg-yellow-600">
                          Vedette
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs lg:text-sm text-gray-400">
                    <span>Stock: {product.stock}</span>
                    {product.chakra && <span>Chakra: {product.chakra}</span>}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                      className="flex-1 text-xs lg:text-sm text-gray-300 border-gray-600 hover:bg-gray-700"
                    >
                      <Edit className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(product)}
                      className="text-xs lg:text-sm"
                    >
                      <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add/Edit Product Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Modifier le produit" : "Ajouter un produit"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <Label>Images du produit {!editingProduct && <span className="text-red-500">*</span>} (minimum 2, maximum 5)</Label>
                
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={preview} 
                          alt={`Aperçu ${index + 1}`} 
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 rounded-full p-1 h-6 w-6"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                        {index === 0 && (
                          <Badge className="absolute bottom-1 left-1 text-xs">
                            Principale
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={imagePreviews.length >= 5}
                  className="w-full text-gray-300 border-gray-600 hover:bg-gray-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {imagePreviews.length === 0 ? "Choisir des images" : "Ajouter d'autres images"}
                  {imagePreviews.length > 0 && ` (${imagePreviews.length}/5)`}
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom du produit</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Prix (€)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="chakra">Chakra</Label>
                  <Input
                    id="chakra"
                    name="chakra"
                    value={formData.chakra}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox 
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={handleFeaturedChange}
                  />
                  <Label htmlFor="is_featured" className="flex items-center text-gray-300">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    Produit vedette
                  </Label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto text-gray-300 border-gray-600 hover:bg-gray-700">
                  Annuler
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 w-full sm:w-auto"
                  disabled={createProductMutation.isPending || updateProductMutation.isPending || uploadImageMutation.isPending}
                >
                  {createProductMutation.isPending || updateProductMutation.isPending || uploadImageMutation.isPending
                    ? "Enregistrement..." 
                    : editingProduct ? "Modifier" : "Ajouter"
                  }
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer le produit "{productToDelete?.name}" ? 
                Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-gray-300 border-gray-600 hover:bg-gray-700">Annuler</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
                disabled={deleteProductMutation.isPending}
              >
                {deleteProductMutation.isPending ? "Suppression..." : "Supprimer"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>
  );
};

export default AdminProducts;

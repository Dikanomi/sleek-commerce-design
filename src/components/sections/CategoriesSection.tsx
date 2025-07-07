import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: "elektronik",
    name: "Elektronik",
    icon: "📱",
    description: "Smartphone, Laptop, Gadget",
    color: "bg-blue-50 hover:bg-blue-100"
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "👗",
    description: "Pakaian, Sepatu, Aksesoris",
    color: "bg-pink-50 hover:bg-pink-100"
  },
  {
    id: "rumah-tangga",
    name: "Rumah Tangga",
    icon: "🏠",
    description: "Furniture, Dekorasi, Perabot",
    color: "bg-green-50 hover:bg-green-100"
  },
  {
    id: "olahraga",
    name: "Olahraga",
    icon: "⚽",
    description: "Alat Olahraga, Fitness",
    color: "bg-orange-50 hover:bg-orange-100"
  },
  {
    id: "kesehatan",
    name: "Kesehatan",
    icon: "💊",
    description: "Obat, Vitamin, Kosmetik",
    color: "bg-red-50 hover:bg-red-100"
  },
  {
    id: "otomotif",
    name: "Otomotif",
    icon: "🚗",
    description: "Mobil, Motor, Sparepart",
    color: "bg-purple-50 hover:bg-purple-100"
  },
  {
    id: "makanan",
    name: "Makanan",
    icon: "🍕",
    description: "Snack, Minuman, Bumbu",
    color: "bg-yellow-50 hover:bg-yellow-100"
  },
  {
    id: "buku",
    name: "Buku & Media",
    icon: "📚",
    description: "Buku, CD, Gaming",
    color: "bg-indigo-50 hover:bg-indigo-100"
  }
];

const CategoriesSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Jelajahi Kategori
          </h2>
          <p className="text-muted-foreground">
            Temukan produk yang Anda butuhkan dari berbagai kategori
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <Card className={`group hover:shadow-card-hover transition-all duration-300 cursor-pointer border-border ${category.color}`}>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
import { Component } from "@angular/core"

interface Product {
  id: number
  name: string
  price: string
  description: string
  image: string
}

@Component({
  selector: "app-products",
  standalone: true,
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: "Classic Wooden Keychain",
      price: "$19.99",
      description: "Premium bamboo with custom laser engraving",
      image: "/assets/images/classic-keychain.jpg",
    },
    {
      id: 2,
      name: "Metallic Edge Keychain",
      price: "$24.99",
      description: "Wood-metal fusion with personalized text",
      image: "/assets/images/metallic-keychain.jpg",
    },
    {
      id: 3,
      name: "Photo Engraved Keychain",
      price: "$29.99",
      description: "Your favorite photo laser-etched on wood",
      image: "/assets/images/photo-keychain.jpg",
    },
    {
      id: 4,
      name: "QR Code Keychain",
      price: "$22.99",
      description: "Custom QR code with wooden finish",
      image: "/assets/images/qr-keychain.jpg",
    },
  ]
}


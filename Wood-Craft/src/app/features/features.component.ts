import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

interface Feature {
  icon: string
  title: string
  description: string
}

@Component({
  selector: "app-features",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./features.component.html",
  styleUrls: ["./features.component.scss"],
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: "shield",
      title: "Premium Quality",
      description: "Handcrafted from sustainable bamboo and hardwoods",
    },
    {
      icon: "flash_on",
      title: "Fast Production",
      description: "Quick 24-48 hour turnaround time for all orders",
    },
    {
      icon: "favorite",
      title: "Custom Design",
      description: "Personalize with your text, images, or QR codes",
    },
    {
      icon: "card_giftcard",
      title: "Gift Ready",
      description: "Premium packaging perfect for gifting",
    },
  ]
}


import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

interface Testimonial {
  name: string
  rating: number
  text: string
}

@Component({
  selector: "app-testimonials",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./testimonials.component.html",
  styleUrls: ["./testimonials.component.scss"],
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      name: "Sarah M.",
      rating: 5,
      text: "The perfect anniversary gift! The engraving quality is exceptional.",
    },
    {
      name: "John D.",
      rating: 5,
      text: "Ordered multiple keychains for our team. Everyone loved them!",
    },
    {
      name: "Emily R.",
      rating: 5,
      text: "Beautiful craftsmanship and fast delivery. Will order again!",
    },
  ]

  getStars(rating: number): number[] {
    return Array(rating).fill(0)
  }
}


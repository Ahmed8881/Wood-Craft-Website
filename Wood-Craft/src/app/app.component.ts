import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { HeroComponent } from './hero/hero.component';
import { ProductsComponent } from "./products/products.component";
import { FeaturesComponent } from "./features/features.component";
import { CustomizeComponent } from "./customize/customize.component";
import { TestimonialsComponent } from "./testimonials/testimonials.component";
import { SceneComponent } from "./scene/scene.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HeroComponent, ProductsComponent, FeaturesComponent, CustomizeComponent, TestimonialsComponent, SceneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Wood-Craft';
  customText = "Your Message"

  onCustomTextChange(text: string) {
    this.customText = text
  }
}

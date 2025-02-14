import { Component, Output, EventEmitter } from "@angular/core"

@Component({
  selector: "app-hero",
  standalone: true,
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.scss"],
})
export class HeroComponent {
  @Output() customTextChange = new EventEmitter<string>()
  customText = "Your Message"

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement
    this.customText = input.value
    this.customTextChange.emit(this.customText)
  }
}


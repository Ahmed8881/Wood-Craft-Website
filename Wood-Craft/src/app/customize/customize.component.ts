import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
@Component({
  selector: "app-customize",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./customize.component.html",
  styleUrls: ["./customize.component.scss"],
})
export class CustomizeComponent {
  woodTypes = ["Bamboo", "Maple", "Oak"]
  fontStyles = ["Classic", "Modern", "Script"]
  activeTab = "text"

  setActiveTab(tab: string) {
    this.activeTab = tab
  }
}


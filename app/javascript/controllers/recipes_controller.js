import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  show(event) {
    event.stopPropagation();
    document.getElementById("search-results").classList.toggle("hidden");
  }

  hideSearchResults() {
    document.getElementById("search-results").classList.add("hidden");
  }
}

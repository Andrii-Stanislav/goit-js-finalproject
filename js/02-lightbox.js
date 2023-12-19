import { galleryItems } from "./gallery-items.js";

const galeryList = document.getElementById("gallery");

const listMarkup = galleryItems.reduce(
  (acc, item) => `${acc}
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </li>
    `,
  ""
);

galeryList.insertAdjacentHTML("beforeend", listMarkup);

const lightboxGalery = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

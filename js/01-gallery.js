import { galleryItems } from "./gallery-items.js";

const galeryList = document.getElementById("gallery");

// creating and setting modal
const instance = basicLightbox.create('<img src="" alt="" class="modal__image"/>', {
  onShow: () => document.addEventListener("keydown", closeOnEscClick),
  onClose: () => document.removeEventListener("keydown", closeOnEscClick),
});

function closeOnEscClick(event) {
  if (event.code === "Escape") {
    instance.close();
  }
}

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

galeryList.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;

  const modalImgSrc = event.target.dataset.source;
  const modalImgAlt = event.target.alt;

  const modalImg = instance.element().querySelector(".modal__image");
  modalImg.src = modalImgSrc;
  modalImg.alt = modalImgAlt;
  instance.show();
});

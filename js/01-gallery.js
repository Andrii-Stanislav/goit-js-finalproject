import { galleryItems } from "./gallery-items.js";

const galeryList = document.getElementById("gallery");

galleryItems.forEach((item) => {
  // creating and setting listItem
  const itemElement = document.createElement("li");
  itemElement.classList.add("gallery__item");

  // creating and setting link
  const imageLink = document.createElement("a");
  imageLink.classList.add("gallery__link");
  imageLink.href = item.original;

  // creating and setting modal
  const instance = basicLightbox.create(
    `
    <div class="modal">
        <div class="modal_image-box">
            <img src="${item.original}" alt="${item.description}" class="modal__image"/>      
        </div>
    </div>
`,
    {
      onShow: () => {
        document.addEventListener("keydown", closeOnEscClick);
      },
      onClose: () => {
        document.removeEventListener("keydown", closeOnEscClick);
      },
    }
  );

  function closeOnEscClick(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }

  // opening modal on click link
  imageLink.addEventListener("click", (event) => {
    event.preventDefault();
    instance.show();
  });

  // creating and setting image
  const image = document.createElement("img");
  image.src = item.preview;
  image.alt = item.description;
  image.classList.add("gallery__image");
  image.setAttribute("data-source", item.original);

  // put image inside the link
  imageLink.append(image);

  // put link inside the listItem
  itemElement.append(imageLink);

  // adding listItem to the galeryList
  galeryList.append(itemElement);
});
